import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateTableInput } from "../schemas/tableSchemas";
import { tablesApi } from "@/services";
import { queryKeys } from "@/lib";

/**
 * useCreateTable Hook
 *
 * Create a new table
 *
 * @example
 * const { mutation: createTable } = useCreateTable();
 * createTable({ id: 1, number: 3, location: 'Entrada Principal', status: 'AVAILABLE'})
 */
export function useCreateTable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTableInput) => {
      const response = await tablesApi.createTable(data);
      return response.data;
    },

    // On success: invalidate cache to refresh tables
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tables.all });
    },
  });
}
