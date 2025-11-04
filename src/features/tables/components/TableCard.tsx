import { TableStatus, type Table } from "@/types";
import { useUpdateTableStatus } from "../hooks";
import { useDeleteTable } from "../hooks/useDeleteTable";
import { Button, Card } from "@/components";
import { TableStatusBadge } from "./TableStatusBadge";

interface TableCardProps {
    table: Table;
    onEdit: (table: Table) => void;
}

/**
 * TableCard component
 *
 * Displays a single table with actions
 */
export function TableCard({ table, onEdit }: TableCardProps) {
    const { mutate: updateStatus, isPending: isUpdatingStatus } =
        useUpdateTableStatus();
    const { mutate: deleteTable, isPending: isDeleting } = useDeleteTable();

    const handleStatusChange = (newStatus: TableStatus) => {
        updateStatus({ id: table.id, status: newStatus });
    };

    const handleDelete = () => {
        if (window.confirm("¿Eliminar esta mesa?")) {
            deleteTable(table.id);
        }
    };

    return (
        <Card padding="md" className="hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Mesa</h3>
                    <p className="text-sm text-gray-600">Número: {table.number}</p>
                </div>
                <TableStatusBadge status={table.status} />
            </div>
            {/* Status Action */}
            <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600 font-medium mb-2">
                    Cambiar Estado:
                </p>
                <div className="flex flex-wrap gap-2">
                    {table.status !== TableStatus.AVAILABLE && (
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleStatusChange(TableStatus.AVAILABLE)}
                            disabled={isUpdatingStatus}
                        >
                            Disponible
                        </Button>
                    )}
                    {table.status !== TableStatus.OCCUPIED && (
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleStatusChange(TableStatus.OCCUPIED)}
                            disabled={isUpdatingStatus}
                        >
                            Ocupada
                        </Button>
                    )}
                    {table.status !== TableStatus.NEEDS_CLEANING && (
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleStatusChange(TableStatus.NEEDS_CLEANING)}
                            disabled={isUpdatingStatus}
                        >
                            Limpieza
                        </Button>
                    )}
                </div>
                {/* Edit & Delete Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => onEdit(table)}
                        fullWidth
                    >
                        Editar
                    </Button>
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        isLoading={isDeleting}
                        fullWidth
                    >
                        Eliminar
                    </Button>
                </div>
            </div>
        </Card>
    );
}
