import { tablesApi } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateTableInput } from "../schemas/tableSchemas";
import { queryKeys } from "@/lib";

/**
 * useUpdateTable Hook
 *
 * Updates an existing table
 *
 * @example
 * const { mutate: updateTable } = useUpdateTable();
 * updateTable({ id: 1, number: 10, capacity: 6 })
 */
export function useUpdateTable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateTableInput & { id: number }) => {
      const response = await tablesApi.updateTable(id, data);
      return response.data;
    },

    // On Success: invalidate specific table and all tables cache
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tables.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.tables.detail(data.id),
      });
    },
  });
}
