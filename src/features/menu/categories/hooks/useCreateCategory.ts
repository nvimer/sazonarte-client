import { menuApi } from "@/services";
import { queryKeys } from "@/lib";
import type { CreateMenuCategoryInput } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * useCreateCategory Hook
 *
 * Create a new Category
 *
 * @example
 * const { mutation: createCategory } = useCreateCategory();
 * createCategory({ id: 1, name: 'Entradas', order: 3})
 */
export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateMenuCategoryInput) => {
            const response = await menuApi.createCategory(data);
            return response.data;
        },
        // On Success: invalidate cache to refres categories
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.categories.all,
            });
        },
    });
}
