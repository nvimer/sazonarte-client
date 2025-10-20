import { Button, Card, Input } from "@/components";
import React, { useState } from "react";

const ComponentsTestPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!email.includes("@")) {
      setEmailError("Invalid email");
      return;
    }

    setEmailError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert(`Submitted: \nEmail: ${email}\nPassword: ${password}`);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/*Page Title*/}
        <h1 className="text-3xl font-bold text-gray-900">
          Test de Componentes UI
        </h1>

        {/* Buttons Section*/}
        <Card>
          <h2 className="text-2xl font-semibold mb-4">Botones</h2>

          <div className="space-y-4">
            {/*Variants*/}
            <div>
              <p className="text-sm text-gray-600 mb-2">Variantes:</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="primary">Primario</Button>
                <Button variant="secondary">Secundario</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
            {/* Sizes */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Sizes:</p>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm">Pequeño</Button>
                <Button size="md">Medio</Button>
                <Button size="lg">Grande</Button>
              </div>
            </div>
            {/* States */}
            <div>
              <p className="text-sm text-gray-600 mb-2">States:</p>
              <div className="flex flex-wrap items-center gap-2">
                <Button>Normal</Button>
                <Button disabled>Inactivo</Button>
                <Button isLoading>Cargando</Button>
              </div>
            </div>
            {/* Full Width */}
            <div>
              <p className="text-sm text-gray-600 mb-2">States:</p>
              <div className="flex flex-wrap items-center gap-2">
                <Button fullWidth>Botón de tamaño completo</Button>
              </div>
            </div>

            {/* Inputs Section */}
            <Card>
              <h2 className="text-2xl font-semibold mb-4">Inputs</h2>

              <div className="space-y-4">
                {/* Normal Input */}
                <Input
                  label="Email"
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={emailError}
                />
                {/* Input with helper text */}
                <Input
                  label="Password / Contraseña"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  helperText="Debe Tener al menos 8 caracteres"
                />
                {/* Disabled input */}
                <Input
                  label="Input Deshabilitado"
                  value="No puedes editar esto"
                  disabled
                />
              </div>
            </Card>

            {/* Cards Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Cards</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Different paddings */}
                <Card padding="sm" shadow="sm">
                  <h3 className="font-semibold">Small Padding</h3>
                  <p className="text-sm text-gray-600">padding="sm"</p>
                </Card>
                <Card padding="md" shadow="md">
                  <h3 className="font-semibold">Medium Padding</h3>
                  <p className="text-sm text-gray-600">padding="md"</p>
                </Card>
                <Card padding="lg" shadow="lg">
                  <h3 className="font-semibold">Large Padding</h3>
                  <p className="text-sm text-gray-600">padding="lg"</p>
                </Card>
                <Card padding="md" shadow="none">
                  <h3 className="font-semibold">Sin sombra</h3>
                  <p className="text-sm text-gray-600">shadow="none"</p>
                </Card>
              </div>
            </div>

            {/* Form Example */}
            <Card>
              <h2 className="text-2xl font-semibold mb-4">
                Ejemplo de formulario
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="tu@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <div className="flex gap-2">
                  <Button type="submit" isLoading={isLoading}>
                    Enviar
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setEmail("");
                      setPassword("");
                      setEmailError("");
                    }}
                  >
                    Limpiar
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ComponentsTestPage;
