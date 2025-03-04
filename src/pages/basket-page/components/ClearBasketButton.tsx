import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClearBasket } from "@/api/hooks/basket-hooks";
import { errorMessage } from "@/utilities/errors";
import { useToast } from "@/components/ui/use-toast";

export function ClearBasketButton() {
    const { mutateAsync: clearBasket, isPending: isClearingBasket } = useClearBasket();
    const { errorToast } = useToast();

    const handleClearBasket = async () => {
        try {
            await clearBasket();
        }
        catch (error) {
            errorToast(errorMessage("Failed to clear basket. Please try again later.", error));
        }
    };

    return (
        <Button variant="destructive" onClick={handleClearBasket} disabled={isClearingBasket} className="gap-2">
            <Trash2 className="h-4 w-4" />
            {isClearingBasket ? "Clearing basket..." : "Clear Basket"}
        </Button>
    );
}
