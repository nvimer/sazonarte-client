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
        <Card>
            {/* Header */}
            <div>
                <div>
                    <h3>Mesa</h3>
                    <p>Número: {table.number}</p>
                </div>
                <TableStatusBadge status={table.status} />
            </div>
            {/* Status Action */}
            <div>
                <p>Cambiar Estado:</p>
                <div>
                    {table.status !== TableStatus.AVAILABLE && (
                        <Button>Marcar Diponible</Button>
                    )}
                    {table.status !== TableStatus.OCCUPIED && (
                        <Button>Marcar Ocupada</Button>
                    )}
                    {table.status !== TableStatus.NEEDS_CLEANING && (
                        <Button>Necesita Limpieza</Button>
                    )}
                </div>
                {/* Edit & Delete Actions */}
                <div>
                    <Button>Editar</Button>
                    <Button>Eliminar</Button>
                </div>
            </div>
        </Card>
    );
}
