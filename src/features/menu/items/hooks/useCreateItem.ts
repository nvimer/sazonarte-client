import { menuApi } from "@/services";
import { queryKeys } from "@/lib";
import type { CreateMenuItemInput } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateMenuItemInput) => {
            const response = await menuApi.createMenuItem(data);
            return response.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.menu.all });
        },
    });
}
