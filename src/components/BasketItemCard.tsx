import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type CartItemCardProps = {
    item: {
        productId: string;
        name: string;
        price: number;
        quantity: number;
        totalPrice: number;
    };
    onUpdateQuantity: (data: { productId: string; quantity: number }) => void;
    onRemoveItem: (productId: string) => void;
};

export function BasketItemCard({item, onUpdateQuantity, onRemoveItem}: CartItemCardProps) {
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
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => item.quantity > 1 && onUpdateQuantity({
                            productId: item.productId,
                            quantity: item.quantity - 1
                        })}
                    >
                        -
                    </Button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateQuantity({productId: item.productId, quantity: item.quantity + 1})}
                    >
                        +
                    </Button>
                </div>
                <Button variant="destructive" size="sm" onClick={() => onRemoveItem(item.productId)}>
                    Remove
                </Button>
            </CardContent>
        </Card>
    );
}