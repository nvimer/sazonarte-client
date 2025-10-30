import { menuApi } from "@/api";
import { queryKeys } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export function useItems() {
    return useQuery({
        queryKey: queryKeys.menu.all,
        queryFn: async () => {
            const result = await menuApi.getMenuItems();
            return result.data.data;
        },
        staleTime: 5 * 60 * 1000,
    });
}
