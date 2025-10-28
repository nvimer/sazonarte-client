import type { MenuCategory } from "@/types";
import { useCreateCategory, useUpdateCategory } from "../hooks";
import { useForm } from "react-hook-form";
import {
    createCategorySchema,
    type CreateCategoryInput,
} from "../schemas/categoriesSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@/components";

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
    const { mutate: updateCategory, isPending: isEditing } = useUpdateCategory();

    const isPending = isCreating || isEditing;

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
            }
            : {
                name: "",
                description: "",
            },
    });

    const onSubmit = (data: CreateCategoryInput) => {
        if (isEditing && category) {
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
            // Create Category
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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    htmlFor="name"
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
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
                <Button
                    size="sm"
                    type="submit"
                    isLoading={isPending}
                    disabled={isPending}
                    onClick={handleSubmit(onSubmit)}
                    fullWidth
                >
                    {isPending ? "Guardando..." : category ? "Actualizar" : "Crear"}
                </Button>
                {onCancel && (
                    <Button
                        fullWidth
                        size="sm"
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                    >
                        Cancelar
                    </Button>
                )}
            </div>
        </form>
    );
}
