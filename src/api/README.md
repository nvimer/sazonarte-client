# API Layer

Esta carpeta contiene **todos los servicios que se comunican con tu backend**.

## ¿Por qué separar esto?

- **Centralización**: Todos tus endpoints en un solo lugar
- **Reutilización**: Múltiples componentes pueden usar la misma función
- **Mantenimiento**: Si la URL cambia, solo editas aquí
- **Testing**: Fácil de mockear en pruebas

## Ejemplo:
```typescript
// ordersApi.ts
export const getOrders = async () => {
  const response = await axios.get('/api/orders');
  return response.data;
}
```
