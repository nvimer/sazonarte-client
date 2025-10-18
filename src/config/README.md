# Config

Configuraciones y **constantes** de la aplicación.

## ¿Qué va aquí?

```typescript
// constants.ts
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const APP_NAME = 'SazonArte';
export const ITEMS_PER_PAGE = 20;

// routes.ts
export const ROUTES = {
  HOME: '/',
  ORDERS: '/orders',
  MENU: '/menu',
  LOGIN: '/login'
} as const;
```

## Ventajas:

- Valores centralizados
- Fácil de cambiar
- Evita "magic numbers" en el código
- Autocompletado en TypeScript
