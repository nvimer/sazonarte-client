import { Button } from "@/components";
import type { MenuItem } from "@/types";

interface MenuItemCardProps {
    item: MenuItem;
    onEdit: (item: MenuItem) => void;
    onDelete: (id: number) => void;
}

export function MenuItemCard({ item, onEdit, onDelete }: MenuItemCardProps) {
    return (
        <div className=" bg-white p-4 rounded-lg shadow-md border border-gray-200 mt-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.categoryId}</p>
                </div>
                <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${item.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                    {item.isAvailable ? "Disponible" : "No Disponible"}
                </span>
            </div>

            {/* Description  */}
            {item.description && (
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
            )}

            {/* Price */}
            <div className="mb-4">
                <span className="text-2xl font-bold text-orange-600">{item.price}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <Button variant="primary" size="sm" onClick={() => onEdit(item)}>
                    Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => onDelete(item.id)}>
                    Eliminar
                </Button>
            </div>
        </div>
    );
}
