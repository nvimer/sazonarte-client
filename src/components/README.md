# Components

Componentes **reutilizables** que se usan en múltiples lugares.

## Subcarpetas:

### `ui/`
Componentes visuales básicos (botones, inputs, cards, modals, etc.)
- Son "tontos" (no tienen lógica de negocio)
- Reciben datos por props
- Son altamente reutilizables

Ejemplo: `Button.tsx`, `Input.tsx`, `Card.tsx`

### `layout/`
Componentes de estructura (header, footer, sidebar, navegación)
- Definen la estructura visual de la app
- Suelen envolver otras páginas/componentes

Ejemplo: `Header.tsx`, `Sidebar.tsx`, `MainLayout.tsx`
