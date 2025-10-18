# Types

Tipos de TypeScript **compartidos** en toda la aplicación.

## ¿Qué va aquí?

- Tipos globales usados en múltiples lugares
- Interfaces de respuestas de API
- Tipos de utilidad generales
- Enums globales

## Ejemplo:
```typescript
// common.ts
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// enums.ts
export enum OrderStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}
```
