import { useServices } from "@/hooks/use-services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { errorToast } from "@/hooks/use-toast.ts";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { BasketItemCard } from "@/components/BasketItemCard";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart } from "lucide-react";
import { Paths } from "@/utilities/Paths";
import { AxiosError } from "axios";

export function BasketPage() {
    const { basketService } = useServices();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: basketItems, isPending, error } = useQuery({
        queryKey: ["basket"],
        queryFn: () => basketService.getItemsInBasket(),
    });

    const clearBasketMutation = useMutation({
        mutationFn: () => basketService.clearBasket(),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["basket"] }),
        onError: () => errorToast("Failed to clear cart. Please try again."),
    });

    const updateQuantityMutation = useMutation({
        mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) => basketService.updateQuantityInBasket(productId, quantity),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["basket"] }),
        onError: (error) => errorToast(error instanceof AxiosError ? error.response?.data.detail : "Failed to add item. Please try again.")
    });

    const removeItemMutation = useMutation({
        mutationFn: (productId: string) => basketService.deleteItemFromBasket(productId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["basket"] }),
        onError: () => errorToast("Failed to remove item. Please try again."),
    });

    const placeOrderMutation = useMutation({
        mutationFn: () => basketService.placeOrder(),
        onSuccess: async (orderId) => {
            await queryClient.invalidateQueries({ queryKey: ["basket"] });
            navigate(Paths.orderPlaced(), { state: { orderId } });
        },
        onError: (error: Error) => errorToast(error instanceof AxiosError ? error.response?.data.detail : "Failed to place order. Please try again.")
    });

    if (error) {
        errorToast("Failed to load basket. Please try again later.");
        return null;
    }

    if (isPending) {
        return (
            <div className="flex justify-center min-h-[50vh]">
                <LoadingSpinner className="w-10 h-10 text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-[500px]">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Basket</h1>
                    {basketItems.length > 0 && (
                        <Button
                            variant="default"
                            onClick={() => clearBasketMutation.mutate()}
                            disabled={clearBasketMutation.isPending}
                            className="gap-2"
                        >
                            <Trash2 className="h-4 w-4" />
                            {clearBasketMutation.isPending ? "Clearing basket..." : "Clear Basket"}
                        </Button>
                    )}
                </div>

                {basketItems.length > 0 ? (
                    basketItems.map((item) => (
                        <BasketItemCard
                            key={item.productId}
                            item={item}
                            onUpdateQuantity={updateQuantityMutation.mutate}
                            onRemoveItem={removeItemMutation.mutate}
                        />
                    ))
                ) : (
                    <p className="text-center text-muted-foreground mt-6">Your basket is empty.</p>
                )}

                {basketItems.length > 0 && (
                    <div className="mt-6">
                        <Button
                            size="lg"
                            className="w-full"
                            onClick={() => placeOrderMutation.mutate()}
                            disabled={placeOrderMutation.isPending}
                        >
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            {placeOrderMutation.isPending ? "Placing Order..." : "Place Order"}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}