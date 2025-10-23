import { TableStatus, type Table } from "@/types";
import { useCreateTable, useUpdateTable } from "../hooks";
import { useForm } from "react-hook-form";
import {
    type CreateTableInput,
    createTableSchema,
} from "../schemas/tableSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Input } from "@/components";

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
 */
export function TableForm({ table, onSuccess, onCancel }: TableFormProps) {
    const isEditing = !!table;

    const { mutate: createTable, isPending: isCreating } = useCreateTable();
    const { mutate: updateTable, isPending: isUpdating } = useUpdateTable();

    const isPending = isCreating || isUpdating;

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateTableInput>({
        resolver: zodResolver(createTableSchema),
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

    const onSubmit = (data: CreateTableInput) => {
        if (isEditing && table) {
            // Update existing table
            updateTable(
                { id: table.id, ...data },
                {
                    onSuccess: () => {
                        alert("¡Mesa Actualizada!");
                        onSuccess?.();
                    },
                    onError: (error: any) => {
                        alert(`Error: ${error.response?.data?.message || error.message}`);
                    },
                },
            );
        } else {
            // Create new table
            createTable(data, {
                onSuccess: () => {
                    alert("¡Mesa Creada!");
                    onSuccess?.();
                },
                onError: (error: any) => {
                    alert(`Error: ${error.response?.data?.message || error.message}`);
                },
            });
        }
    };

    return (
        <Card>
            <h2>{isEditing ? "Editar Mesa" : "Nueva Mesa"}</h2>
            <form action="">
                {/* Table Number  */}
                <Input />
                {/* Status */}
                <Input />
                {/* Actions */}
                <div>
                    <Button>{isEditing ? "Actualizar" : "Crear"}</Button>
                    {onCancel && <Button>Cancelar</Button>}
                </div>
            </form>
        </Card>
    );
}
