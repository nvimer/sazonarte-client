/**
 * CONSTANTES DE LA APLICACIÓN
 *
 * Centralizamos todos los valores constantes aquí para:
 * 1. Evitar "magic numbers" en el código
 * 2. Facilitar cambios (un solo lugar)
 * 3. Mejor mantenibilidad
 */

// URL base de tu API de Node.js
// import.meta.env.VITE_API_URL viene de las variables de entorno
// Si no existe, usa localhost:8080 como fallback
// IMPORTANTE: Tu API usa /api/v1 como prefijo base
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";
export const API_PREFIX = "/api/v1"; // Prefijo de tu API
export const API_URL = `${API_BASE_URL}${API_PREFIX}`; // URL completa

// Nombre de la aplicación
export const APP_NAME = "SazonArte";

// Configuración de paginación
export const ITEMS_PER_PAGE = 20;

// Tiempos de timeout para requests (en milisegundos)
export const API_TIMEOUT = 10000; // 10 segundos

// Tiempo de revalidación de caché (React Query)
export const CACHE_TIME = 5 * 60 * 1000; // 5 minutos
export const STALE_TIME = 1 * 60 * 1000; // 1 minuto
