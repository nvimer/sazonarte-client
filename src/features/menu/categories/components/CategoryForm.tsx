import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Input } from "@/components";
import type { MenuCategory } from "@/types";
import {
    createCategorySchema,
    type CreateCategoryInput,
} from "../schemas/categorySchemas";
import { useCreateCategory, useUpdateCategory } from "../hooks";
import { Check, X } from "lucide-react";

// ========== TYPES ===========
interface CategoryFormProps {
    // if editing
    category?: MenuCategory;
    onSuccess?: () => void;
    onCancel?: () => void;
}

/**
 * Category Form Component
 *
 * Form to create or edit a meny category
 *
 * Features /
 * - React Hook Form with zod validation
 * - Create or Edit mode
 * - Name, description and order fields
 * - Success/Error handling
 */
export function CategoryForm({
    category,
    onSuccess,
    onCancel,
}: CategoryFormProps) {
    // ============= HOOKS =============
    const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
    const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();

    const isLoading = isCreating || isUpdating;

    // ============ FORM SETUP ==============
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateCategoryInput>({
        resolver: zodResolver(createCategorySchema),
        // Default values based on mode
        defaultValues: category
            ? {
                name: category.name,
                description: category.description || "",
                order: category.order,
            }
            : {
                name: "",
                description: "",
                order: 0,
            },
    });

    // ============== FORM SUBMIT ===============
    const onSubmit = (data: CreateCategoryInput) => {
        if (category) {
            // Update existing category
            updateCategory(
                { id: category.id, ...data },
                {
                    onSuccess: () => {
                        reset();
                        onSuccess?.();
                    },
                    onError: (error: any) => {
                        alert(`Error: ${error.response?.message || error.message}`);
                    },
                },
            );
        } else {
            // Create new Category
            createCategory(data, {
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                },
                onError: (error: any) => {
                    alert(`Error: ${error.response?.message || error.message}`);
                },
            });
        }
    };

    // ================= RENDER =================
    return (
        <Card variant="elevated" padding="xl">
            {/* ============== FORM HEADER ============= */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
                    {category ? "Editar Categoría" : "Nueva Categoría"}
                </h2>
                <p className="text-neutral-600 font-light">
                    {category
                        ? "Modifica los datos de la categoría"
                        : "Completa los datos para crear una nueva categoría"}
                </p>
            </div>

            {/* =============== FORM ============= */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Category Name  */}
                <Input
                    id="name"
                    label="Nombre de la Categoría"
                    type="text"
                    placeholder="Ej. Bebidas, Entradas, Postres..."
                    helperText="Nombre visible en el Menú"
                    {...register("name")}
                    error={errors.name?.message}
                />

                {/* Description  */}
                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        {...register("description")}
                        rows={3}
                        placeholder="Breve descripción de la categoría (opcional)"
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white text-neutral-900 placeholder:text-neutral-400 placeholder:font-light transition-all resize-none"
                    />
                    {errors.description && (
                        <p className="text-red-600 text-sm mt-2 font-light">
                            {errors.description.message}
                        </p>
                    )}
                    <p className=" text-xs text-neutral-500 mt-1.5 font-light">
                        Opcional: Agrega más contexto sobre esta categoría
                    </p>
                </div>

                {/* Order */}
                <Input
                    label="Orden de Visualización"
                    type="number"
                    placeholder="0"
                    helperText="Orden en que se mostrará (menor = primero)"
                    {...register("order", { valueAsNumber: true })}
                    error={errors.order?.message}
                />

                {/* =========== ACTION BUTTONS ============= */}
                <div className="flex gap-3 pt-6">
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isLoading}
                        isLoading={isLoading}
                        fullWidth
                    >
                        {!isLoading && <Check className="w-5 h-5 mr-2" />}
                        {category ? "Actualizar Categoría" : "Crear Categoría"}
                    </Button>

                    {/* Cancel Button */}
                    {onCancel && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="lg"
                            onClick={onCancel}
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
