import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { usePlaceOrder } from "@/api/hooks/order-hooks";
import { Paths } from "@/utilities/paths";
import { errorMessage } from "@/utilities/errors";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/utilities/AuthProvider.tsx";

export function PlaceOrderButton() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { errorToast } = useToast();
    const { mutateAsync: placeOrder, isPending: isPlacingOrder } = usePlaceOrder();

    const handlePlaceOrder = async () => {
        try {
            const orderId = await placeOrder();
            navigate(Paths.orderPlaced(), { state: { orderId } });
        }
        catch (error) {
            errorToast(errorMessage("Failed to place order. Please try again later.", error));
        }
    };

    return (
        <div className="mt-6">
            <Button size="lg" className="w-full" onClick={handlePlaceOrder} disabled={(!user?.address || !user?.cardDetails) || isPlacingOrder}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                {isPlacingOrder ? "Placing Order..." : "Place Order"}
            </Button>
        </div>
    );
}
