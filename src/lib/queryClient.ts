import { CACHE_TIME, STALE_TIME } from "@/config/constants";
import { QueryClient } from "@tanstack/react-query";

/**
 * QueryClient configuration
 *
 * Manages server state caching and fetching.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // How long data is fresh
      staleTime: STALE_TIME,
      // How long unused data stays in cache
      gcTime: CACHE_TIME,
      // Retry failed request once
      retry: 1,
      // Don't refetch on window focus
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Query Keys
 *
 * Centralized query Keys for cache management.
 *
 * @example
 * useQuery({ queryKey: queryKeys.tables.all })
 */
export const queryKeys = {
  // Tables
  tables: {
    // All tables
    all: ["tables"] as const,
    // Single table
    detail: (id: number) => ["tables", id] as const,
    // Filter by status
    byStatus: (status: string) => ["tables", { status }] as const,
  },

  // Menu
  menu: {
    all: ["menu"] as const,
    categories: ["menu", "categories"] as const,
    items: ["menu", "items"] as const,
  },
};
