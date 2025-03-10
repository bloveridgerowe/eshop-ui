import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/utilities/errors";
import { useAddToBasket } from "@/api/hooks/basket-hooks";
import { useAuth } from "@/components/utilities/AuthProvider"
import { useToast } from "@/components/ui/use-toast";

export interface AddToBasketButtonProps {
    productId: string;
    quantity: number;
    disabled: boolean;
}

export function AddToBasketButton({ productId, quantity, disabled }: AddToBasketButtonProps) {
    const { mutateAsync: addToBasket, isPending: isAddingToBasket } = useAddToBasket();
    const { successToast, errorToast } = useToast();
    const { user } = useAuth();

    const handleAddToBasket = async () => {
        if (!user) {
            errorToast("You need to be signed in to add items to your basket.");
            return;
        }

        try {
            await addToBasket({ productId: productId, quantity });
            successToast(`${quantity} item${quantity > 1 ? "s" : ""} added to basket.`);
        }
        catch (error) {
            errorToast(errorMessage("Failed to add item to basket. Please try again later.", error));
        }
    };

    return (
        <Button size="sm" onClick={handleAddToBasket} disabled={disabled || isAddingToBasket}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isAddingToBasket ? "Adding..." : "Add to Basket"}
        </Button>
    );
}
