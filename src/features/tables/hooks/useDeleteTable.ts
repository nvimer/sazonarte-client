import { tablesApi } from "@/services";
import { queryKeys } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await tablesApi.deleteTable(id);
      return id;
    },

    // On success: remove from cache
    onSuccess: (deletedId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tables.all });
      queryClient.resetQueries({
        queryKey: queryKeys.tables.detail(deletedId),
      });
    },
  });
}
