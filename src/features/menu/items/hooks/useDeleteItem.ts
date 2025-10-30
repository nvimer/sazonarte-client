import { menuApi } from "@/api";
import { queryKeys } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            await menuApi.deleteCategory(id);
            return id;
        },

        onSuccess: (deletedId) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.menu.all,
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.menu.detail(deletedId),
            });
        },
    });
}
