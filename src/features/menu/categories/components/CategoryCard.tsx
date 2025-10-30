import { Button } from "@/components";
import type { MenuCategory } from "@/types";

interface CategoryCardProps {
    category: MenuCategory;
    onEdit: (category: MenuCategory) => void;
    onDelete: (id: number) => void;
}

/**
 * MenuCategory Card component
 *
 *  Displays a single category with actions
 */
export function CategoryCard({
    category,
    onEdit,
    onDelete,
}: CategoryCardProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
            </div>
            {category.description && (
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
            )}
            <p className="text-gray-600 text-sm mb-4">{category.order}</p>
            <div className="flex gap-2">
                <Button variant="primary" size="sm" onClick={() => onEdit(category)}>
                    Editar
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(category.id)}
                >
                    Eliminar
                </Button>
            </div>
        </div>
    );
}
