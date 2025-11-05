import { TableStatus, type Table } from "@/types";
import { useCreateTable, useUpdateTable } from "../hooks";
import { useForm } from "react-hook-form";
import {
    type CreateTableInput,
    createTableSchema,
} from "../schemas/tableSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Input } from "@/components";
import { Check, X } from "lucide-react";

// ================ TYPES ==================
interface TableFormProps {
    // If editing
    table?: Table;
    onSuccess?: () => void;
    onCancel?: () => void;
}

/**
 * TableForm Component
 *
 * Form to create or edit a table
 *
 * Features /
 * - React Hook Form with Zod validation
 * - Create or Edit mode
 * - Success/Error handling
 * - Loading states
 */
export function TableForm({ table, onSuccess, onCancel }: TableFormProps) {
    // ================== MODE DETECTION =================
    const isEditing = !!table;

    // ====================== HOOKS ========================
    const { mutate: createTable, isPending: isCreating } = useCreateTable();
    const { mutate: updateTable, isPending: isUpdating } = useUpdateTable();

    const isPending = isCreating || isUpdating;

    // ======= FORM SETUP ==========
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateTableInput>({
        resolver: zodResolver(createTableSchema),
        // Default values base on mode
        defaultValues: table
            ? {
                number: table.number,
                location: table.location || "",
                status: table.status || TableStatus.AVAILABLE,
            }
            : {
                number: undefined,
                location: "",
                status: TableStatus.OCCUPIED,
            },
    });

    // ================== FORM SUBMIT ======================
    const onSubmit = (data: CreateTableInput) => {
        if (isEditing && table) {
            // Update existing table
            updateTable(
                { id: table.id, ...data },
                {
                    onSuccess: () => {
                        onSuccess?.();
                    },
                    onError: (error: any) => {
                        alert(`Error: ${error.response?.message || error.message}`);
                    },
                },
            );
        } else {
            // Create new table
            createTable(data, {
                onSuccess: () => {
                    onSuccess?.();
                },
                onError: (error: any) => {
                    alert(`Error: ${error.response?.message || error.message}`);
                },
            });
        }
    };

    // =============== RENDER =================
    return (
        <Card variant="elevated" padding="xl">
            {/* ================== FORM HEADER =============== */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
                    {isEditing ? "Editar Mesa" : "Nueva Mesa"}
                </h2>
                <p>
                    {isEditing
                        ? "Modifica los datos de la mesa"
                        : "Completa los datos para crear una nueva mesa"}
                </p>
            </div>

            {/* ======================== FORM ==================== */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Table Number Input */}
                <Input
                    label="Número de mesa"
                    type="number"
                    placeholder="1"
                    {...register("number", { valueAsNumber: false })}
                    error={errors.number?.message}
                />
                {/* Location Input */}
                <Input
                    label="Ubicación"
                    type="text"
                    placeholder="Ej. Entrada, Sala, Ventana..."
                    {...register("location")}
                    error={errors.location?.message}
                />

                {/* ================== ACTIONS BUTTON ============= */}
                <div className="flex gap-3 pt-6">
                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        isLoading={isPending}
                        disabled={isPending}
                        fullWidth
                    >
                        {!isPending && <Check className="w-5 h-5 mr-2" />}
                        {isEditing ? "Actualizar Mesa" : "Crear Mesa"}
                    </Button>

                    {/* Cancel Button */}
                    {onCancel && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="lg"
                            onClick={onCancel}
                            disabled={isPending}
                            fullWidth
                        >
                            <X className="w-5 h-5 mr-2" />
                            Cancelar
                        </Button>
                    )}
                </div>
            </form>
        </Card>
    );
}
