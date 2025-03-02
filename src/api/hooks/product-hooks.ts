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

interface useGetProductsParams {
    searchQuery?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
}

export function useGetProducts({ searchQuery, categoryId, minPrice, maxPrice }: useGetProductsParams) {
    return useQuery({
        queryKey: ["products", { searchQuery, categoryId, minPrice, maxPrice } ],
        queryFn: () => getProducts({ search: searchQuery, category: categoryId, minPrice, maxPrice }),
        staleTime: 60 * 1000
    });
}
