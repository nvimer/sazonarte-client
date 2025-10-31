export function TestDesignPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container-responsive py-24">
        <section className="mb-24">
          <h1 className="mb-6">Heading 1 - Grande</h1>
          <h2 className="mb-6">Heading 2 - Espaciado</h2>
          <h3 className="mb-6">Heading 3 - Minimalista</h3>
          <p className="mb-4">
            Este es un parrafo de prueba con fuente light y espaciado medio.
            Debe verse elegante y fácil de leer.
          </p>
        </section>

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
        <section className="mb-24">
          <h3 className="mb-8">Componentes Base</h3>

          {/* Card */}
          <div className="card mb-8 max-w-md">
            <h4 className="mb-3">Card Minimalista</h4>
            <p>Este es un card con borde sutil, sombra suave y mucho padding</p>
          </div>

          {/* Buttons  */}
          <div className=" flex gap-4 mb-8">
            <button className="btn-primary">Primary Button</button>
            <button className="btn-secondary">Secondary Button</button>
            <button className="btn-ghost">Ghost Button</button>
          </div>

          {/* Bagdes */}
          <div>
            <span className="badge-primary"> Primary Badge </span>
            <span className="badge-secondary"> Secondary Badge </span>
          </div>

          {/* Input */}
          <input
            type="text"
            placeholder="Input minimalsita..."
            className="input-base max-w-md"
          />
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
      </div>
    </div>
  );
}
