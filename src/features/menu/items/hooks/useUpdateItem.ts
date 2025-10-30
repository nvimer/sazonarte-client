import { menuApi } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib";
import type { UpdateMenuItemInput } from "@/types";

export function useUpdateItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            ...data
        }: UpdateMenuItemInput & { id: number }) => {
            const response = await menuApi.updateMenuItem(id, data);
            return response.data;
        },

        onSuccess: (_, data) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.menu.all });
            queryClient.invalidateQueries({
                queryKey: queryKeys.menu.detail(data.id),
            });
        },
    });
}
