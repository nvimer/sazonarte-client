import { menuApi } from "@/services";
import { queryKeys } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * useDeleteItem Hook
 *
 * Hook to delete a menu item
 * Hook para eliminar un producto del menú
 *
 * NOTE: Fixed bug - was calling deleteCategory instead of deleteMenuItem
 * NOTA: Bug corregido - estaba llamando deleteCategory en lugar de deleteMenuItem
 */
export function useDeleteItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            await menuApi.deleteMenuItem(id);
            return id;
        },

        onSuccess: (deletedId) => {
            // Invalidate items queries to refetch / Invalidar queries de items
            queryClient.invalidateQueries({
                queryKey: queryKeys.menu.all,
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.menu.detail(deletedId),
            });
        },
    });
}
