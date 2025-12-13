import { menuApi } from "@/services";
import { queryKeys } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export function useItems() {
    return useQuery({
        queryKey: queryKeys.menu.all,
        queryFn: async () => {
            const response = await menuApi.getMenuItems();
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
    });
}
