import type { CreateMenuItemInput, MenuItem } from "@/types";
import { useCreateItem } from "../hooks/useCreateItem";
import { useUpdateItem } from "../hooks/useUpdateItem";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createItemSchema } from "../schemas/itemsSchemas";
import { Button, Input } from "@/components";
import { useCategories } from "../../categories/hooks";

interface MenuItemFormProps {
    item?: MenuItem;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function MenuItemForm({ item, onSuccess, onCancel }: MenuItemFormProps) {
    const { mutate: createMenuItem, isPending: isCreating } = useCreateItem();
    const { mutate: updateMenuItem, isPending: isUpdating } = useUpdateItem();
    const { data: categories, isLoading: loadingCategories } = useCategories();

    const isLoading = isCreating || isUpdating;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateMenuItemInput>({
        resolver: zodResolver(createItemSchema),
        defaultValues: item
            ? {
                name: item.name,
                description: item.description || "",
                categoryId: item.categoryId,
                price: item.price,
                isExtra: item.isExtra,
                isAvailable: item.isAvailable,
                imageUrl: item.imageUrl || "",
            }
            : {
                description: "",
                isExtra: false,
                isAvailable: true,
            },
    });

    const onSubmit = (data: CreateMenuItemInput) => {
        if (item) {
            // Update
            updateMenuItem(
                { id: item.id, ...data },
                {
                    onSuccess: () => {
                        alert("¡Producto Actualizado!");
                        onSuccess?.();
                    },
                    onError: (error: any) => {
                        alert(`Error: ${error.response?.messagge || error.message}`);
                    },
                },
            );
        } else {
            createMenuItem(data, {
                onSuccess: () => {
                    alert("¡Producto Creado!");
                    onSuccess?.();
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
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
                    placeholder="Ej. Chuleta de Cerdo"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
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
                    placeholder="Descripción del producto"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.description.message}
                    </p>
                )}
            </div>

            {/* Price */}
            <div>
                <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Precio *
                </label>
                <Input
                    id="price"
                    type="text"
                    {...register("price")}
                    placeholder="12500"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
                {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                )}
            </div>

            {/* Category */}
            <div>
                <label
                    htmlFor="categoryId"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Categoría *
                </label>
                <select
                    id="categoryId"
                    {...register("categoryId", { valueAsNumber: true })}
                    disabled={loadingCategories}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                    <option value="">Selecciona una categoría</option>
                    {categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.categoryId && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.categoryId.message}
                    </p>
                )}
            </div>

            {/* Available */}
            <div className="flex items-center gap-2">
                <Input
                    id="available"
                    type="checkbox"
                    {...register("isAvailable")}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="available">Disponible</label>
            </div>

            {/* Extra */}
            <div className="flex items-center gap-2">
                <Input
                    id="extra"
                    type="checkbox"
                    {...register("isExtra")}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="extra">Extra</label>
            </div>

            {/* Image */}
            <div>
                <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    URL de la Imagen
                </label>
                <Input
                    type="text"
                    id="image"
                    {...register("imageUrl")}
                    placeholder="https://ejemplo.com/pizza.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
                {errors.imageUrl && (
                    <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
                )}
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
                <Button size="sm" variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? "Guardando" : item ? "Actualizar" : "Crear"}
                </Button>
                {onCancel && (
                    <Button size="sm" variant="secondary" onClick={onCancel}>
                        Cancelar
                    </Button>
                )}
            </div>
        </form>
    );
}
