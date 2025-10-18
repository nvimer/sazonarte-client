/**
 * RUTAS DE LA APLICACIÓN
 * 
 * Definimos todas las rutas aquí para:
 * 1. Autocompletado en TypeScript
 * 2. Evitar errores de tipeo
 * 3. Fácil refactorización (cambiar una ruta en un solo lugar)
 * 
 * El 'as const' hace que TypeScript trate estos valores como literales
 * en lugar de solo strings, lo que da mejor type checking
 */

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  
  // Pedidos
  ORDERS: '/orders',
  ORDER_DETAIL: '/orders/:id', // :id es un parámetro dinámico
  ORDER_NEW: '/orders/new',
  
  // Menú
  MENU: '/menu',
  MENU_ITEM_DETAIL: '/menu/:id',
  
  // Mesas (si las usas)
  TABLES: '/tables',
  
  // Perfil
  PROFILE: '/profile',
} as const;

/**
 * Funciones helper para generar rutas con parámetros
 */
export const getOrderDetailRoute = (orderId: string | number) => 
  `/orders/${orderId}`;

export const getMenuItemDetailRoute = (itemId: string | number) => 
  `/menu/${itemId}`;
