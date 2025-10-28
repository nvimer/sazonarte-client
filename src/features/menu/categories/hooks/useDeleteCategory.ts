import { menuApi } from "@/api";
import { queryKeys } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * useDeleteCategory Hook
 *
 * Delete an existing category
 *
 * @example
 * const { mutation: deleteCategory } = useDeleteCategory();
 * deleteCategory({ id: 1 })
 */
export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            await menuApi.deleteCategory(id);
            return id;
        },
        // On Success: remove from cache
        onSuccess: (id) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
            queryClient.invalidateQueries({
                queryKey: queryKeys.categories.detail(id),
            });
        },
    });
}
