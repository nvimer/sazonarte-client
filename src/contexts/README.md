# Contexts

Context API de React para **estado global**.

## ¿Cuándo usar Context?

Cuando necesitas compartir datos entre MUCHOS componentes 
sin pasar props manualmente en cada nivel.

## Casos de uso comunes:

- **AuthContext**: Usuario autenticado, login, logout
- **ThemeContext**: Tema claro/oscuro
- **CartContext**: Carrito de compras (en tu caso, pedido actual)

## ⚠️ Importante:

No uses Context para TODO. Solo para datos que:
1. Se necesitan en muchos componentes
2. No cambian muy frecuentemente
3. Son realmente "globales"

Para datos del servidor (pedidos, menú), mejor usa React Query.
