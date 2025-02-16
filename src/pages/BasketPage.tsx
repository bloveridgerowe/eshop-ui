import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { BasketItemCard } from "@/components/BasketItemCard";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart } from "lucide-react";
import { Paths } from "@/utilities/paths";
import { useGetBasketItems, useClearBasket, useUpdateBasketQuantity, useDeleteItemFromBasket } from "@/api/hooks/basket-hooks";
import { usePlaceOrder } from "@/api/hooks/order-hooks";
import { errorMessage } from "@/utilities/errors";

export function BasketPage() {
    const navigate = useNavigate();
    const { errorToast } = useToast();
    const { data: basketItems, isPending, error } = useGetBasketItems();
    const { mutateAsync: clearBasket, isPending: isClearingBasket } = useClearBasket();
    const { mutateAsync: updateQuantity } = useUpdateBasketQuantity();
    const { mutateAsync: removeItem } = useDeleteItemFromBasket();
    const { mutateAsync: placeOrder, isPending: isPlacingOrder } = usePlaceOrder();

    if (error) {
        errorToast(errorMessage("Failed to load basket. Please try again later.", error));
        return null;
    }

    const handleClearBasket = async () => {
        try {
            await clearBasket();
        }
        catch (error) {
            errorToast(errorMessage("Failed to clear basket. Please try again later.", error));
        }
    };

    const handleUpdateQuantity = async (productId: string, quantity: number) => {
        try {
            await updateQuantity({ productId, quantity });
        }
        catch (error) {
            errorToast(errorMessage("Failed to update item. Please try again later.", error));
        }
    };

    const handleRemoveItem = async (productId: string) => {
        try {
            await removeItem({ productId });
        }
        catch (error) {
            errorToast(errorMessage("Failed to remove item. Please try again later.", error));
        }
    };

    const handlePlaceOrder = async () => {
        try {
            const orderId = await placeOrder();
            navigate(Paths.orderPlaced(), { state: { orderId } });
        }
        catch (error) {
            errorToast(errorMessage("Failed to place order. Please try again later.", error));
        }
    };

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
                        <Button variant="default" onClick={handleClearBasket} disabled={isClearingBasket} className="gap-2">
                            <Trash2 className="h-4 w-4" />
                            {isClearingBasket ? "Clearing basket..." : "Clear Basket"}
                        </Button>
                    )}
                </div>

                {basketItems.length > 0 ? (
                    basketItems.map((item) => (
                        <BasketItemCard key={item.productId} item={item} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem}/>
                    ))
                ) : (
                    <p className="text-center text-muted-foreground mt-6">Your basket is empty.</p>
                )}

                {basketItems.length > 0 && (
                    <div className="mt-6">
                        <Button size="lg" className="w-full" onClick={handlePlaceOrder} disabled={isPlacingOrder}>
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            {isPlacingOrder ? "Placing Order..." : "Place Order"}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
