import { useState } from "react";
import { useTables } from "../hooks";
import { TableStatus, type Table } from "@/types";
import { Button, Card } from "@/components";
import { TableCard, TableForm } from "../components";

export function TablesPage() {
    const { data: tables, isLoading, error } = useTables();
    const [showForm, setShowForm] = useState(false);
    const [editingTable, setEditingTable] = useState<Table | undefined>();
    const [statusFilter, setStatusFilter] = useState<TableStatus | "ALL">("ALL");

    // Filter tables by status
    const filteredTables = tables?.filter((table) => {
        if (statusFilter === "ALL") return true;
        return table.status === statusFilter;
    });

    // Handle edit
    const handleEdit = (table: Table) => {
        setEditingTable(table);
        setShowForm(true);
    };

    // Handle form close
    const handleFormClose = () => {
        setShowForm(false);
        setEditingTable(undefined);
    };

    // Loading state
    if (isLoading) {
        return (
            <div>
                <div>
                    <div>
                        <p>Cargando mesas...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div>
                <Card>
                    <h2>Error</h2>
                    <p>{error.message}</p>
                    <Button>Reintentar</Button>
                </Card>
            </div>
        );
    }

    return (
        <div>
            <div>
                {/* Header */}
                <div>
                    <div>
                        <h1>Mesas</h1>
                        <p>Gestionar mesas del restaurante</p>
                    </div>
                    <Button>{showForm ? "Cancelar" : "Nueva Mesa"}</Button>
                </div>
                {/* Form (conditional) */}
                {showForm && (
                    <div>
                        <TableForm />
                    </div>
                )}
                {/* Filters */}
                <Card>
                    <div>
                        <span>Filtrar por estado: </span>
                        <div>
                            <Button>Todas ({tables?.data.length || 0})</Button>
                            <Button>
                                Disponibles (
                                {tables?.data.filter((t) => t.status === TableStatus.AVAILABLE)
                                    .length || 0}
                                )
                            </Button>
                            <Button>
                                Ocupadas (
                                {tables?.data.filter((t) => t.status === TableStatus.OCCUPIED)
                                    .length || 0}
                                )
                            </Button>
                            <Button>
                                Limpieza (
                                {tables?.data.filter(
                                    (t) => t.status === TableStatus.NEEDS_CLEANING,
                                ).length || 0}
                                )
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Tables Grid */}
                {filteredTables && filteredTables.length > 0 ? (
                    <div>
                        {filteredTables.map((table) => (
                            <TableCard />
                        ))}
                    </div>
                ) : (
                    <Card>
                        <p>
                            {statusFilter === "ALL"
                                ? "No se encontraron mesas. ¡Crea tu primera mesa!"
                                : "No hay mesas con este estado"}
                        </p>
                    </Card>
                )}
            </div>
        </div>
    );
}
