import { Card, CardContent, CardFooter } from "./ui/card";
import { cn } from "@/lib/utils";
import { Product } from "@/api/services/products-service.ts";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServices } from "@/hooks/use-services";
import { successToast, errorToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store.ts";

export interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { basketService } = useServices();
    const { status } = useSelector((state: RootState) => state.auth);

    const [ quantity, setQuantity ] = useState(product.stock > 0 ? "1" : "0");

    const queryClient = useQueryClient();

    const getStockDisplay = (product: Product) => {
        if (product.stock === 0) {
            return {
                text: "Out of stock",
                color: "text-red-500",
            };
        }
        if (product.stock <= 5) {
            return {
                text: `Only ${product.stock} left`,
                color: "text-yellow-500",
            };
        }
        return {
            text: `${product.stock} in stock`,
            color: "text-green-500",
        };
    };

    const stockInfo = getStockDisplay(product);

    const addToBasketMutation = useMutation({
        mutationFn: async (qty: number) => {
            if (status !== "authenticated") {
                throw new Error("Not authenticated");
            }
            await basketService.addToBasket(product.id, qty);
        },
        onSuccess: async (_, qty) => {
            await queryClient.invalidateQueries({ queryKey: ["basket"] });
            successToast(`${qty} item${qty > 1 ? "s" : ""} added to basket.`);
        },
        onError: (error: Error) => error.message === "Not authenticated"
            ? errorToast("You need to be signed in to add items to your basket.")
            : errorToast("Failed to add item to basket. Please try again.")
    });

    const handleAddToBasket = () => {
        const parsedQuantity = Number(quantity);

        if (!quantity || isNaN(parsedQuantity) || parsedQuantity < 1) {
            errorToast("Please enter a valid quantity (minimum of 1).");
            return;
        }
        if (parsedQuantity > product.stock) {
            errorToast(`Only ${product.stock} item${product.stock > 1 ? "s" : ""} available.`);
            return;
        }

        addToBasketMutation.mutate(parsedQuantity);
    };

    return (
        <Card>
            <div className="aspect-square relative">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-cover w-full h-full rounded-t-lg"
                />
            </div>
            <CardContent className="p-2 flex-1">
                <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                <p className="text-xs text-muted-foreground">{product.category}</p>
                <div className="flex justify-between items-center mt-1">
                    <p className="font-semibold text-sm">£{product.price.toFixed(2)}</p>
                    <p className={cn("text-xs font-medium", stockInfo.color)}>{stockInfo.text}</p>
                </div>
            </CardContent>
            <CardFooter className="p-2 flex-col gap-2">
                <div className="flex items-center gap-2 w-full">
                    {product.stock > 0 && (
                        <div className="w-20">
                            <Input
                                type="number"
                                min="1"
                                max={product.stock}
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="h-9 border-border"
                            />
                        </div>
                    )}
                    <Button
                        size="sm"
                        className="flex-1"
                        onClick={handleAddToBasket}
                        disabled={addToBasketMutation.isPending || product.stock === 0}
                    >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {addToBasketMutation.isPending ? "Adding..." : (
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
