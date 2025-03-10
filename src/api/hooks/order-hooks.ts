import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getOrders, placeOrder } from "@/api/services/order-service";
import { queryKeys } from "@/api/hooks/query-keys";

export function useGetOrders() {
    return useSuspenseQuery({
        queryKey: queryKeys.orders,
        queryFn: getOrders,
        staleTime: 60 * 1000,
    });
}

export function usePlaceOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: placeOrder,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: queryKeys.basket });
            await queryClient.invalidateQueries({ queryKey: queryKeys.orders });
            await queryClient.invalidateQueries({ queryKey: queryKeys.products });
            await queryClient.invalidateQueries({ queryKey: queryKeys.product });
        },
    });
}
