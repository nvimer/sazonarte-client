import { Button, Card, Input, StatCard } from "@/components";
import { Badge } from "@/components/ui/Badge";
import { DollarSign, Home, TrendingUp, Users } from "lucide-react";

export function TestDesignPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container-responsive py-24">
        {/* Colors test */}
        <section className="mb-24">
          <h3 className="mb-8">Paleta de colores</h3>
          <div className="grid grid-cols-5 gap-5">
            <div className="h-24 bg-primary-50 rounded-xl"></div>
            <div className="h-24 bg-primary-100 rounded-xl"></div>
            <div className="h-24 bg-primary-500 rounded-xl"></div>
            <div className="h-24 bg-primary-600 rounded-xl"></div>
            <div className="h-24 bg-primary-700 rounded-xl"></div>
          </div>
          <div className="grid grid-cols-5 gap-4 mt-4">
            <div className="h-24 bg-neutral-50 rounded-xl border"></div>
            <div className="h-24 bg-neutral-100 rounded-xl border"></div>
            <div className="h-24 bg-neutral-500 rounded-xl border"></div>
            <div className="h-24 bg-neutral-700 rounded-xl border"></div>
            <div className="h-24 bg-neutral-900 rounded-xl border"></div>
          </div>
        </section>

        {/* Components test  */}
        {/* Header */}
        <div className="mb-24">
          <h1 className="mb-4">Componentes Minimalistas</h1>
          <p className="text-xl">
            Sistema de componentes base con diseño editorial y espaciado
            generoso
          </p>
        </div>

        {/* CARDS */}
        <section className="mb-32">
          <h2 className="mb-12">Cards</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card variant="default">
              <h3 className="mb-3">Default Card</h3>
              <p>Border sutil, sombre suave, muchos padding.</p>
            </Card>

            <Card variant="elevated">
              <h3 className="mb-3">Elevated Card</h3>
              <p>Sin border, sombra más pronunciada.</p>
            </Card>

            <Card variant="bordered">
              <h3 className="mb-3">Bordered Card</h3>
              <p>Hover effect con elevación.</p>
            </Card>
          </div>
        </section>

        {/* BUTTONS */}
        <section className="mb-32">
          <h2 className="mb-12">Buttons</h2>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="sm">
                Small
              </Button>
              <Button variant="primary" size="md">
                Medium
              </Button>
              <Button variant="primary" size="lg">
                Large
              </Button>
              <Button variant="primary" size="xl">
                Extra Large
              </Button>
            </div>
          </div>
        </section>

        {/* INPUTS */}
        <section className="mb-32">
          <h2 className="mb-12">Inputs</h2>
          <div className="max-w-md space-y-6">
            <Input
              label="Nombre"
              placeholder="Escribe tu nombre..."
              fullWidth
            />

            <Input
              label="Email"
              type="email"
              placeholder="Escribe tu email..."
              helperText="Te enviamos un código de verificación"
              fullWidth
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              error="La contraseña debe tener al menos 8 caracteres"
              fullWidth
            />
          </div>
        </section>

        {/* BADGES */}
        <section className="mb-32">
          <h2 className="mb-12">Badges</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="neutral">Neutral</Badge>
            </div>

            <div className="flex flex-wrap gap-3">
              <Badge variant="primary" size="sm">
                Small
              </Badge>
              <Badge variant="primary" size="md">
                Medium
              </Badge>
            </div>
          </div>
        </section>

        {/* STAT CARDS */}
        <section className="mb-32">
          <h2 className="mb-12">Stat Cards</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard
              title="Mesas Activas"
              value="12"
              change="+3"
              trend="up"
              description="vs mes anterior"
              icon={<Home className="w-6 h-6 text-primary-600" />}
            />

            <StatCard
              title="Total Usuarios"
              value="2,435"
              change="+12%"
              trend="up"
              description="este mes"
              icon={<Users className="w-6 h-6 text-blue-600" />}
            />

            <StatCard
              title="Ingresos"
              value="$45.231"
              change="-5%"
              trend="down"
              description="vs mes anterior"
              icon={<DollarSign className="w-6 h-6 text-green-600" />}
            />

            <StatCard
              title="Conversión"
              value="3.24%"
              trend="neutral"
              icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
            />
          </div>
        </section>

        {/* Spacing test */}
        <section>
          <h3 className="mb-8">Espaciado</h3>
          <div className="space-y-8">
            <div className="h-20 bg-primary-50 rounded-xl"></div>
            <div className="h-20 bg-primary-100 rounded-xl"></div>
            <div className="h-20 bg-primary-50 rounded-xl"></div>
          </div>
        </section>

        {/* COMBINED EXAMPLE */}
        <section>
          <h2 className="mb-12">Ejemplo combinado</h2>
          <Card variant="elevated" padding="xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="mb-2">Configuración de Perfil</h3>
                <p>Actualiza tu información</p>
              </div>
              <Badge variant="success">Activo</Badge>
            </div>

            <div className="space-y-6 mb-8">
              <Input
                label="Nombre completo"
                placeholder="Juan Pablo Bermudez"
                fullWidth
              />

              <Input
                label="Email"
                type="email"
                placeholder="juan@mail.com"
                fullWidth
              />
            </div>

            <div className="flex gap-4">
              <Button variant="primary" size="md">
                Guardar Cambios
              </Button>
              <Button variant="ghost" size="md">
                Cancelar
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
