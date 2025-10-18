# Utils

Funciones utilitarias **puras** (sin dependencia de React).

## Características:

- **Sin side effects**: Misma entrada = misma salida
- **Reutilizables**: Se usan en muchos lugares
- **Independientes de React**: JavaScript/TypeScript puro

## Ejemplos:

```typescript
// formatters.ts
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  }).format(amount);
}

// validators.ts
export const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```
