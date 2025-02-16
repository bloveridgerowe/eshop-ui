import { Card, CardContent, CardFooter } from "./ui/card";
import { cn } from "@/lib/utils";
import { Product } from "@/api/services/products-service";
import { useState } from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { getStockDisplay } from "@/utilities/stock";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useAddToBasket } from "@/api/hooks/basket-hooks";
import { Paths } from "@/utilities/paths";

export interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { successToast, errorToast } = useToast();
    const { user } = useAuth();
    const { mutateAsync: addToBasket, isPending } = useAddToBasket();
    const [ quantity, setQuantity ] = useState(product.stock > 0 ? 1 : 0);
    const stockInfo = getStockDisplay(product);

    const handleAddToBasket = async () => {
        if (!user) {
            errorToast("You need to be signed in to add items to your basket.");
            return;
        }

        try {
            await addToBasket({ productId: product.id, quantity });
            successToast(`${quantity} item${quantity > 1 ? "s" : ""} added to basket.`);
        }
        catch {
            errorToast("Failed to add item to basket. Please try again later.");
        }
    };

    const quantityOptions = Array.from({ length: product.stock }, (_, i) => i + 1);

    return (
        <Card>
            <div className="aspect-square relative">
                <Link to={Paths.product(product.id)}>
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="object-cover w-full h-full rounded-t-lg"
                    />
                </Link>
            </div>
            <CardContent className="p-2 flex-1">
                <h3 className="font-medium text-sm line-clamp-1">
                    <Link to={Paths.product(product.id)} className="hover:underline">
                        {product.name}
                    </Link>
                </h3>
                <p className="text-xs text-muted-foreground">{product.category}</p>
                <div className="flex justify-between items-center mt-1">
                    <p className="font-semibold text-sm">£{product.price.toFixed(2)}</p>
                    <p className={cn("text-xs font-bold", stockInfo.color)}>
                        {stockInfo.text}
                    </p>
                </div>
            </CardContent>
            <CardFooter className="p-2 flex-col gap-2">
                <div className="flex items-center gap-2 w-full">
                    {product.stock > 0 && (
                        <div className="w-20">
                            <Select
                                value={String(quantity)}
                                onValueChange={(value) => setQuantity(Number(value))}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Qty" />
                                </SelectTrigger>
                                <SelectContent>
                                    {quantityOptions.map((option) => (
                                        <SelectItem key={option} value={String(option)}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    <Button size="sm" className="flex-1" onClick={handleAddToBasket} disabled={isPending || product.stock === 0}>
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
                </div>
            </CardFooter>
        </Card>
    );
}
