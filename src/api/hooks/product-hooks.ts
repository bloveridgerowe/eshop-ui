import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api/hooks/query-keys";
import { getProduct, getProducts, PriceRange } from "@/api/services/products-service";

export function useGetProduct(id: string) {
    return useSuspenseQuery({
        queryKey: queryKeys.productId(id),
        queryFn: () => getProduct({ id }),
        staleTime: 60 * 1000,
    });
}

interface useGetProductsParams {
    search?: string;
    category?: string;
    priceRange?: PriceRange;
}

export function useGetProducts({ search, category, priceRange }: useGetProductsParams) {
    return useQuery({
        queryKey: ["produ", { search, category, priceRange } ],
        queryFn: () => getProducts({ search, category, priceRange }),
        staleTime: 60 * 1000
    });
}
