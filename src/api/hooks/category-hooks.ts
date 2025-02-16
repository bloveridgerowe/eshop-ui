import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/services/category-service";
import { queryKeys } from "@/api/hooks/query-keys";

export function useGetCategories() {
    return useQuery({
        queryKey: queryKeys.categories,
        queryFn: getCategories,
        staleTime: 60 * 1000,
    });
}
