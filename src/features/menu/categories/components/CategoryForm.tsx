import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@/components";
import type { MenuCategory } from "@/types";
import {
    createCategorySchema,
    type CreateCategoryInput,
} from "../schemas/categorySchemas";
import { useCreateCategory, useUpdateCategory } from "../hooks";

interface CategoryFormProps {
    category?: MenuCategory;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function CategoryForm({
    category,
    onSuccess,
    onCancel,
}: CategoryFormProps) {
    const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
    const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();

    const isLoading = isCreating || isUpdating;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateCategoryInput>({
        resolver: zodResolver(createCategorySchema),
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

    const onSubmit = (data: CreateCategoryInput) => {
        if (category) {
            // Update existing category
            updateCategory(
                { id: category.id, ...data },
                {
                    onSuccess: () => {
                        alert("¡Mesa Actualizada!");
                        reset();
                        onSuccess?.();
                    },
                    onError: (error: any) => {
                        alert(`Error: ${error.response?.message || error.message}`);
                    },
                },
            );
        } else {
            // Create Category
            createCategory(data, {
                onSuccess: () => {
                    alert("¡Mesa Creada!");
                    reset();
                    onSuccess?.();
                },
                onError: (error: any) => {
                    alert(`Error: ${error.response?.message || error.message}`);
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Category Name  */}
            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Nombre *
                </label>
                <Input
                    id="name"
                    type="text"
                    {...register("name")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Ej. Bebidas"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
            </div>

            {/* Description */}
            <div>
                <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Descripción
                </label>
                <textarea
                    id="description"
                    {...register("description")}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Descripción de la categoría"
                />
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.description.message}
                    </p>
                )}
            </div>

            {/* Order */}
            <div>
                <label
                    htmlFor="order"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Órden
                </label>
                <Input
                    id="order"
                    type="number"
                    {...register("order", { valueAsNumber: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Ej. 10"
                />
                {errors.order && (
                    <p className="text-red-500 text-sm mt-1">{errors.order.message}</p>
                )}
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
                <Button
                    size="sm"
                    type="submit"
                    variant="primary"
                    disabled={isLoading}
                    fullWidth
                >
                    {isLoading ? "Guardando..." : category ? "Actualizar" : "Crear"}
                </Button>
                {onCancel && (
                    <Button
                        size="sm"
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                        fullWidth
                    >
                        Cancelar
                    </Button>
                )}
            </div>
        </form>
    );
}
