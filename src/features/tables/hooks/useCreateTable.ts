import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateTableInput } from "../schemas/tableSchemas";
import { tablesApi } from "@/api";
import { queryKeys } from "@/lib";

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
