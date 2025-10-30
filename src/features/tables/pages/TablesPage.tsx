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
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-r-blue-600 mx-auto mb-4">
                        <p className="text-gray-600">Cargando mesas...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Card padding="lg" className="max-w-md">
                    <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
                    <p className="text-gray-700">{error.message}</p>
                    <Button
                        variant="primary"
                        onClick={() => window.location.reload()}
                        className="mt-4"
                        fullWidth
                    >
                        Reintentar
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Mesas</h1>
                        <p className="text-gray-600 mt-1">
                            Gestionar mesas del restaurante
                        </p>
                    </div>
                    <Button
                        size="sm"
                        variant="primary"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? "Cancelar" : "Nueva Mesa"}
                    </Button>
                </div>
                {/* Form (conditional) */}
                {showForm && (
                    <div className="mb-6">
                        <TableForm
                            table={editingTable}
                            onSuccess={handleFormClose}
                            onCancel={handleFormClose}
                        />
                    </div>
                )}
                {/* Filters */}
                <Card padding="md" className="mb-6">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-700">
                            Filtrar por estado:{" "}
                        </span>
                        <div className=" gap-2">
                            <Button
                                size="sm"
                                variant={statusFilter === "ALL" ? "primary" : "ghost"}
                                onClick={() => setStatusFilter("ALL")}
                            >
                                Todas ({tables?.length || 0})
                            </Button>
                            <Button
                                size="sm"
                                variant={
                                    statusFilter === TableStatus.AVAILABLE ? "primary" : "ghost"
                                }
                                onClick={() => setStatusFilter(TableStatus.AVAILABLE)}
                            >
                                Disponibles (
                                {tables?.filter((t) => t.status === TableStatus.AVAILABLE)
                                    .length || 0}
                                )
                            </Button>
                            <Button
                                size="sm"
                                variant={
                                    statusFilter === TableStatus.OCCUPIED ? "primary" : "ghost"
                                }
                                onClick={() => setStatusFilter(TableStatus.OCCUPIED)}
                            >
                                Ocupadas (
                                {tables?.filter((t) => t.status === TableStatus.OCCUPIED)
                                    .length || 0}
                                )
                            </Button>
                            <Button
                                size="sm"
                                variant={
                                    statusFilter === TableStatus.NEEDS_CLEANING
                                        ? "primary"
                                        : "ghost"
                                }
                                onClick={() => setStatusFilter(TableStatus.NEEDS_CLEANING)}
                            >
                                Limpieza (
                                {tables?.filter((t) => t.status === TableStatus.NEEDS_CLEANING)
                                    .length || 0}
                                )
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Tables Grid */}
                {filteredTables && filteredTables.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTables.map((table) => (
                            <TableCard key={table.id} table={table} onEdit={handleEdit} />
                        ))}
                    </div>
                ) : (
                    <Card padding="lg" className="text-center">
                        <p className="text-gray-600 text-lg">
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
