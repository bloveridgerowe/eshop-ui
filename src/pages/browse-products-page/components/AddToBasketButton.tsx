import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAddToBasket } from "@/api/hooks/basket-hooks";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/utilities/AuthProvider";

export interface AddToBasketButtonProps {
    productId: string;
    quantity: number;
    disabled: boolean;
}

export function AddToBasketButton({ productId, quantity, disabled }: AddToBasketButtonProps) {
    const { user } = useAuth();
    const { successToast, errorToast } = useToast();
    const { mutateAsync: addToBasket, isPending } = useAddToBasket();

    const handleAddToBasket = async () => {
        if (!user) {
            errorToast("You need to be signed in to add items to your basket.");
            return;
        }

        try {
            await addToBasket({ productId, quantity });
            successToast(`${quantity} item${quantity > 1 ? "s" : ""} added to basket.`);
        }
        catch {
            errorToast("Failed to add item to basket. Please try again later.");
        }
    };

    return (
        <Button size="sm" className="flex-1" onClick={handleAddToBasket} disabled={disabled || isPending}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isPending ? (
                <>
                    <span className="sm:hidden">Add</span>
                    <span className="hidden sm:inline">Adding...</span>
                </>
            ) : (
                <>
                    <span className="sm:hidden">Add</span>
                    <span className="hidden sm:inline">Add to Basket</span>
                </>
            )}
        </Button>
    );
}
