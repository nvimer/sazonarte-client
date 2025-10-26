import { tablesApi } from "@/api";
import { queryKeys } from "@/lib";
import { useQuery } from "@tanstack/react-query";

/**
 * useTables Hook
 *
 * Fetches all tables from the API
 *
 * @example
 * const { data: tables, isLoading, error } = useTables():
 */
export function useTables() {
  return useQuery({
    queryKey: queryKeys.tables.all,
    queryFn: async () => {
      const response = await tablesApi.getTables();
      // Return array of tables
      return response.data;
    },
    // Optional: Add error handling
    // Retry failed request twice
    retry: 2,
  });
}
