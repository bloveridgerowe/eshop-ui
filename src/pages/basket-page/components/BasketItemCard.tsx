import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BasketItem } from "@/api/services/basket-service";
import { errorMessage } from "@/utilities/errors";
import { useDeleteItemFromBasket, useUpdateBasketQuantity } from "@/api/hooks/basket-hooks";
import { useToast } from "@/components/ui/use-toast";

interface BasketItemCardProps {
    item: BasketItem;
}

export function BasketItemCard({ item }: BasketItemCardProps) {
    const { mutateAsync: updateQuantity } = useUpdateBasketQuantity();
    const { mutateAsync: removeItem } = useDeleteItemFromBasket();
    const { errorToast } = useToast();

    const handleUpdateQuantity = async (productId: string, quantity: number) => {
        try {
            await updateQuantity({ productId, quantity });
        }
        catch {
            return;
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

    return (
        <Card key={item.productId} className="mb-4">
            <CardHeader>
                <div className="flex justify-between items-start w-full">
                    <div>
                        <CardTitle className="font-semibold">{item.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">£{item.price.toFixed(2)} each</p>
                    </div>
                    <p className="font-semibold">£{item.totalPrice.toFixed(2)}</p>
                </div>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => item.quantity > 1 && handleUpdateQuantity(item.productId, item.quantity - 1)}>
                        -
                    </Button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}>
                        +
                    </Button>
                </div>
                <Button variant="default" size="sm" onClick={() => handleRemoveItem(item.productId)}>
                    Remove
                </Button>
            </CardContent>
        </Card>
    );
}
