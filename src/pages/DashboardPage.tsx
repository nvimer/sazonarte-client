import { Button, Card, StatCard } from "@/components";
import { Badge } from "@/components/ui/Badge";
import { useTables } from "@/features/tables";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { TableStatus } from "@/types";
import {
  Table2,
  ClipboardList,
  DollarSign,
  Plus,
  MenuIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function DashboardPage() {
  const { data: tables } = useTables();
  const navigate = useNavigate();

  const activeTables =
    tables?.filter((t) => t.status === "OCCUPIED").length || 0;

  const totalTables = tables?.length || 0;

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-semibold text-neutral-900 tracking-tight mb-3">
          Dashboard
        </h1>
        <p className="text-[15px] text-neutral-600 font-light">
          Bienvenido de nuevo, aquí está un resumen de hoy
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <StatCard
          title="Mesas Activas"
          value={activeTables}
          change="+3 hoy"
          trend="up"
          description="vs ayer"
          icon={<Table2 className="w-6 h-6 text-primary-600" />}
        />

        <StatCard
          title="Órdenes de hoy"
          value="48"
          change="+12%"
          trend="up"
          description="vs mes anterior"
          icon={<ClipboardList className="w-6 h-6 text-blue-600" />}
        />

        <StatCard
          title="Ingresos Hoy"
          value="$2.450"
          change="+18%"
          trend="up"
          description="vs ayer"
          icon={<DollarSign className="w-6 h-6 text-green-600" />}
        />
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Tables */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Estado de Mesas
              </h3>
              <p className="text-sm text-neutral-600 font-light">
                {activeTables} de {totalTables} mesas ocupadas
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/tables")}
            >
              Ver todas
            </Button>
          </div>

          <div className="space-y-3">
            {tables?.slice(0, 5).map((table) => (
              <div
                key={table.id}
                className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-semibold text-neutral-700 border border-neutral-200">
                    {table.number}
                  </div>
                  <div>
                    <div className="font-medium text-neutral-900">
                      Mesa {table.number}
                    </div>
                  </div>
                </div>
                <Badge
                  variant={
                    table.status === TableStatus.OCCUPIED
                      ? "error"
                      : table.status === TableStatus.NEEDS_CLEANING
                        ? "warning"
                        : "success"
                  }
                >
                  {table.status === TableStatus.OCCUPIED
                    ? "Ocupada"
                    : table.status === TableStatus.NEEDS_CLEANING
                      ? "Limpieza"
                      : "Disponible"}
                </Badge>
              </div>
            ))}
          </div>
          {tables?.length === 0 && (
            <div>
              <Table2 className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p>No hay mesas registradas</p>
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <Card>
          <h3>Acciones Rápidas</h3>

          <div>
            <button
              onClick={() => navigate("/tables")}
              className="w-full flex items-center gap-4 p-5 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-all hover:shadow-smooth group"
            >
              <div className="p-3 bg-primary-100 rounded-xl group-hover:bg-primary-200 transition-colors">
                <Plus className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-neutral-900">Nueva Mesa</div>
                <div className="text-sm text-neutral-500 font-light">
                  Agregar mesa al sistema
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate("/menu")}
              className="w-full flex items-center gap-4 p-5 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-all hover:shadow-smooth group"
            >
              <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                <MenuIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-neutral-900">
                  Nuevo Producto
                </div>
                <div className="text-sm text-neutral-500 font-light">
                  Agregar al menú
                </div>
              </div>
            </button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
