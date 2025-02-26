import {useQuery, useSuspenseQuery} from "@tanstack/react-query";
import { queryKeys } from "@/api/hooks/query-keys";
import { getProduct, getProducts } from "@/api/services/products-service";

export function useGetProduct(id: string) {
    return useSuspenseQuery({
        queryKey: queryKeys.productId(id),
        queryFn: () => getProduct({ id }),
        staleTime: 60 * 1000,
    });
}

export function useGetProducts({ searchQuery, categoryId }: { searchQuery?: string; categoryId?: string; }) {
    function getProductsQueryConfig() {
        if (searchQuery) {
            return {
                queryKey: queryKeys.searchProducts(searchQuery),
                queryParams: { searchQuery, categoryId: undefined, isFeatured: false },
            };
        }
        else if (categoryId) {
            return {
                queryKey: queryKeys.productsByCategory(categoryId),
                queryParams: { searchQuery: undefined, categoryId, isFeatured: false },
            };
        }
        else {
            return {
                queryKey: queryKeys.featuredProducts(),
                queryParams: { searchQuery: undefined, categoryId: undefined, isFeatured: true },
            };
        }
    }

    const { queryKey, queryParams } = getProductsQueryConfig();

    return useQuery({
        queryKey,
        queryFn: () => getProducts(queryParams),
        staleTime: 60 * 1000
    });
}
