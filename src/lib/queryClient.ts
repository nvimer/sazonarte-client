/**
 * REACT QUERY CLIENT - Configuración
 * 
 * React Query maneja el estado del servidor (datos de tu API).
 * 
 * ¿Qué hace React Query?
 * 1. Cachea automáticamente los datos
 * 2. Revalida datos en background
 * 3. Maneja loading y error states
 * 4. Evita peticiones duplicadas
 * 5. Actualiza datos automáticamente
 */

import { QueryClient } from '@tanstack/react-query';
import { CACHE_TIME, STALE_TIME } from '@/config/constants';

/**
 * Configuración del Query Client
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /**
       * staleTime: Tiempo en que los datos se consideran "frescos"
       * Durante este tiempo, NO se hace un nuevo fetch automáticamente
       * 
       * 1 minuto = los datos son frescos por 1 minuto
       */
      staleTime: STALE_TIME,

      /**
       * cacheTime: Tiempo que los datos permanecen en caché
       * Después de este tiempo, los datos se eliminan de memoria
       * 
       * 5 minutos = los datos persisten en memoria por 5 minutos
       * aunque no estén siendo usados
       */
      gcTime: CACHE_TIME, // antes se llamaba cacheTime

      /**
       * refetchOnWindowFocus: Si refetch cuando el usuario regresa a la pestaña
       * 
       * true = útil para datos que cambian frecuentemente
       * false = evita peticiones innecesarias
       */
      refetchOnWindowFocus: false,

      /**
       * refetchOnReconnect: Si refetch cuando se recupera la conexión
       * 
       * true = garantiza datos actualizados después de perder conexión
       */
      refetchOnReconnect: true,

      /**
       * retry: Número de reintentos en caso de error
       * 
       * 1 = intenta 1 vez más si falla
       * false = no reintenta
       */
      retry: 1,

      /**
       * retryDelay: Tiempo de espera entre reintentos
       * 
       * Función que aumenta el delay con cada intento
       */
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      /**
       * retry: No reintentar mutaciones por defecto
       * 
       * Las mutaciones (POST, PUT, DELETE) generalmente no deberían
       * reintentarse automáticamente para evitar duplicados
       */
      retry: false,
    },
  },
});

/**
 * Tipos de Query Keys
 * 
 * Query keys son arrays que identifican únicamente cada query.
 * React Query usa estas keys para el caché.
 * 
 * Ejemplo:
 * ['tables'] - todas las mesas
 * ['tables', 1] - mesa con ID 1
 * ['tables', { page: 1, limit: 10 }] - mesas paginadas
 */
export const queryKeys = {
  // Auth
  auth: {
    me: ['auth', 'me'] as const,
  },

  // Tables
  tables: {
    all: ['tables'] as const,
    lists: () => [...queryKeys.tables.all, 'list'] as const,
    list: (params?: Record<string, any>) => 
      [...queryKeys.tables.lists(), params] as const,
    details: () => [...queryKeys.tables.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.tables.details(), id] as const,
  },

  // Menu Categories
  menuCategories: {
    all: ['menu', 'categories'] as const,
    lists: () => [...queryKeys.menuCategories.all, 'list'] as const,
    list: (params?: Record<string, any>) => 
      [...queryKeys.menuCategories.lists(), params] as const,
    details: () => [...queryKeys.menuCategories.all, 'detail'] as const,
    detail: (id: number) => 
      [...queryKeys.menuCategories.details(), id] as const,
  },

  // Menu Items
  menuItems: {
    all: ['menu', 'items'] as const,
    lists: () => [...queryKeys.menuItems.all, 'list'] as const,
    list: (params?: Record<string, any>) => 
      [...queryKeys.menuItems.lists(), params] as const,
    details: () => [...queryKeys.menuItems.all, 'detail'] as const,
    detail: (id: number) => 
      [...queryKeys.menuItems.details(), id] as const,
  },

  // Orders (cuando se implementen)
  orders: {
    all: ['orders'] as const,
    lists: () => [...queryKeys.orders.all, 'list'] as const,
    list: (params?: Record<string, any>) => 
      [...queryKeys.orders.lists(), params] as const,
    details: () => [...queryKeys.orders.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.orders.details(), id] as const,
  },
} as const;
