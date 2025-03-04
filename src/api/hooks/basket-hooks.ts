import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api/hooks/query-keys";
import { addToBasket, clearBasket, deleteItemFromBasket, getItemsInBasket, updateQuantityInBasket } from "@/api/services/basket-service";

export function useGetBasketItems() {
    return useSuspenseQuery({
        queryKey: queryKeys.basket,
        queryFn: getItemsInBasket,
        staleTime: 60 * 1000
    });
}

export function useAddToBasket() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addToBasket,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.basket }),
    });
}

export function useUpdateBasketQuantity() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateQuantityInBasket,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.basket }),
    });
}

export function useDeleteItemFromBasket() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteItemFromBasket,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.basket }),
    });
}

export function useClearBasket() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: clearBasket,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.basket }),
    });
}
