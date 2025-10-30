import { menuApi } from "@/api";
import { queryKeys } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
    return useQuery({
        queryKey: queryKeys.categories.all,
        queryFn: async () => {
            const response = await menuApi.getCategories();
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
