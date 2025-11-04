import { useState } from "react";
import { useTables } from "../hooks";
import { TableStatus, type Table } from "@/types";
import { Button, Card } from "@/components";
import { TableCard, TableForm } from "../components";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Filter, Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

/**
 * TablesPage Component
 * Main page for table management (CRUD operations)
 *
 * Features /
 * - List all tables
 * - Filter by status
 * - Create new table
 * - Edit existng table
 * - Delete table
 */
export function TablesPage() {
    // ============= STATE ===============
    const { data: tables, isLoading, error } = useTables();
    const [showForm, setShowForm] = useState(false);
    const [editingTable, setEditingTable] = useState<Table | undefined>();
    const [statusFilter, setStatusFilter] = useState<TableStatus | "ALL">("ALL");

    // ============ COMPUTED VALUES =============
    // Filter tables by selected status
    const filteredTables = tables?.filter((table) => {
        if (statusFilter === "ALL") return true;
        return table.status === statusFilter;
    });

    // Calculate counts for each status
    const counts = {
        all: tables?.length || 0,
        available:
            tables?.filter((t) => t.status === TableStatus.AVAILABLE).length || 0,
        occuppied:
            tables?.filter((t) => t.status === TableStatus.OCCUPIED).length || 0,
        cleaning:
            tables?.filter((t) => t.status === TableStatus.NEEDS_CLEANING) || 0,
    };

    // ================= EVENT HANDLERS =====================
    // Handle edit button click
    const handleEdit = (table: Table) => {
        setEditingTable(table);
        setShowForm(true);
    };

    // Handle form close (success or cancel)
    const handleFormClose = () => {
        setShowForm(false);
        setEditingTable(undefined);
    };

    // =============== LOADING STATE =============
    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        {/* Loading spinner */}
                        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Cargando mesas...</p>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    // ========== ERROR STATE ========
    if (error) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Card variant="elevated" padding="xl" className="max-w-md">
                        <div className=" text-center">
                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">⚠️</span>
                            </div>
                            <h2 className="text-xl font-semibold text-red-600 mb-2">
                                Error al cargar mesas
                            </h2>
                            <p className="text-neutral-600 mb-6 font-light">
                                {error.message}
                            </p>
                            <Button
                                variant="primary"
                                onClick={() => window.location.reload()}
                                fullWidth
                            >
                                Reintentar
                            </Button>
                        </div>
                    </Card>
                </div>
            </DashboardLayout>
        );
    }

    // ======== MAIN RENDER ========
    return (
        <DashboardLayout>
            {/* ======== PAGE HEADER ======= */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-4xl font-semibold text-neutral-900">
                        Gestión de Mesas
                    </h1>
                    <p className="text-[15px] text-neutral-600 font-light">
                        Administra las mesas del restaurante
                    </p>
                </div>

                {/* New Table Button  */}
                <Button
                    size="lg"
                    variant={showForm ? "ghost" : "primary"}
                    onClick={() => {
                        setShowForm(!showForm);
                        if (showForm) setEditingTable(undefined);
                    }}
                >
                    {showForm ? (
                        "Cancelar"
                    ) : (
                        <>
                            <Plus className="w-5 h-5 mr-2" />
                            Nueva Mesa
                        </>
                    )}
                </Button>
            </div>

            {/* ========== TABLE FORM ==============*/}
            {/*Conditional form display */}
            {showForm && (
                <Card variant="elevated" padding="xl" className="mb-12">
                    <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
                        {editingTable ? "Editar Mesa" : "Nueva Mesa"}
                    </h2>
                    <TableForm
                        table={editingTable}
                        onSuccess={handleFormClose}
                        onCancel={handleFormClose}
                    />
                </Card>
            )}

            {/* ========== STATUS FILTER ============ */}
            <Card variant="elevated" padding="lg" className="mb-8">
                <div className="flex items-center gap-6">
                    {/* Filter Icon and Label */}
                    <div className="flex items-center gap-2 text-neutral-700 font-medium">
                        <Filter className="w-5 h-5" />
                        <span>Filtrar:</span>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-3">
                        {/* All Tables  */}
                        <button
                            onClick={() => setStatusFilter("ALL")}
                            className={`px-4 py-2 rounded-xl transition-all font-medium text-sm ${statusFilter === "ALL" ? "bg-neutral-400 text-white shadow-smooth" : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100"}`}
                        >
                            Todas{" "}
                            <Badge size="sm" variant="neutral" className="ml-2">
                                {counts.all}
                            </Badge>
                        </button>

                        {/* Available Tables */}
                        <button
                            onClick={() => setStatusFilter(TableStatus.AVAILABLE)}
                            className={`px-4 py-2 rounded-xl transition-all font-medium text-sm ${statusFilter === TableStatus.AVAILABLE ? "bg-green-500 text-white shadow-smooth" : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100"}`}
                        >
                            Disponibles{" "}
                            <Badge size="sm" variant="success" className="ml-2">
                                {counts.available}
                            </Badge>
                        </button>

                        {/* Occuppied Tables */}
                        <button
                            onClick={() => setStatusFilter(TableStatus.OCCUPIED)}
                            className={`px-4 py-2 rounded-xl transition-all font-medium text-sm ${statusFilter === TableStatus.OCCUPIED ? "bg-red-500 text-white shadow-smooth" : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100"}`}
                        >
                            Ocupadas{" "}
                            <Badge size="sm" variant="error" className="ml-2">
                                {counts.occuppied}
                            </Badge>
                        </button>

                        {/* Cleaning Tables */}
                        <button
                            onClick={() => setStatusFilter(TableStatus.NEEDS_CLEANING)}
                            className={`px-4 py-2 rounded-xl transition-all font-medium text-sm ${statusFilter === TableStatus.NEEDS_CLEANING ? "bg-yellow-500 text-white shadow-smooth" : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100"}`}
                        >
                            Limpieza{" "}
                            <Badge size="sm" variant="warning" className="ml-2">
                                {counts.occuppied}
                            </Badge>
                        </button>
                    </div>
                </div>
            </Card>

            {/* ============ TABLES GRID ========= */}
            {filteredTables && filteredTables.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTables.map((table) => (
                        <TableCard key={table.id} table={table} onEdit={handleEdit} />
                    ))}
                </div>
            ) : (
                <Card variant="elevated" padding="xl" className="text-center">
                    <div>
                        <div>
                            <Filter />
                        </div>
                        <h3>No hay mesas</h3>
                        <p className="text-gray-600 text-lg">
                            {statusFilter === "ALL"
                                ? "No se encontraron mesas. ¡Crea tu primera mesa!"
                                : "No hay mesas con este estado"}
                        </p>
                        {statusFilter === "ALL" && (
                            <Button variant="primary" onClick={() => setShowForm(true)}>
                                <Plus className="w-5 h-5 mr-2" /> Crear Primera Mesa
                            </Button>
                        )}
                    </div>
                </Card>
            )}
        </DashboardLayout>
    );
}
