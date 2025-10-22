import { tablesApi } from "@/api";
import { queryKeys } from "@/lib";
import { TableStatus } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTableStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: TableStatus }) => {
      const response = await tablesApi.updateTableStatus(id, { status });
      return response.data;
    },

    // Optimistic update: update cache inmediately before API respond
    onMutate: async ({ id, status }) => {
      // Cancel outgoing referches
      await queryClient.cancelQueries({ queryKey: queryKeys.tables.all });

      // Snapshot current value
      const previousTables = queryClient.getQueryData(queryKeys.tables.all);

      // Optimistically update cache
      queryClient.setQueryData(queryKeys.tables.all, (old: any) => {
        if (!old) return old;

        return old.map((table: any) =>
          table.id === id ? { ...table, status } : table,
        );
      });

      // Return context for rollback
      return { previousTables };
    },

    // On error: rollback
    onError: (err, variables, context) => {
      if (context?.previousTables) {
        queryClient.setQueryData(queryKeys.tables.all, context.previousTables);
      }
    },

    // Always refetch after success ir error
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tables.all });
    },
  });
}
