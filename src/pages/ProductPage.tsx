import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { getStockDisplay } from "@/utilities/stock";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Paths } from "@/utilities/paths";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useGetProduct } from "@/api/hooks/product-hooks";
import { useAddToBasket } from "@/api/hooks/basket-hooks";
import { errorMessage } from "@/utilities/errors";

export function ProductPage() {
    const { successToast, errorToast } = useToast();
    const { id } = useParams();
    const { user } = useAuth();
    const [ quantity, setQuantity ] = useState(1);
    const { data: product, isPending, error } = useGetProduct(id!);
    const { mutateAsync: addToBasket, isPending: isAddingToBasket } = useAddToBasket();

    useEffect(() => {
        if (product && product.stock === 0) {
            setQuantity(0);
        }
    }, [ product ]);

    const handleAddToBasket = async () => {
        if (!user) {
            errorToast("You need to be signed in to add items to your basket.");
            return;
        }

        try {
            await addToBasket({ productId: product!.id, quantity });
            successToast(`${quantity} item${quantity > 1 ? "s" : ""} added to basket.`);
        }
        catch (error) {
            errorToast(errorMessage("Failed to load orders. Please try again later.", error));
        }
    };

    if (isPending) {
        return (
            <div className="flex justify-center min-h-[50vh]">
                <LoadingSpinner className="w-10 h-10 text-muted-foreground" />
            </div>
        );
    }

    if (!product || error) {
        return (
            <div className="max-w-2xl mx-auto py-8 px-4 text-center">
                <div className="mb-6">
                    <XCircle className="h-16 w-16 mx-auto text-red-500" />
                </div>
                <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                <p className="text-muted-foreground mb-8">
                    We couldn’t find the product you’re looking for.
                </p>
                <div className="space-y-4">
                    <Link to={Paths.featured()}>
                        <Button className="w-full">Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const stockInfo = getStockDisplay(product);
    const quantityOptions = Array.from({ length: product.stock }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center">
            <Card className="flex items-center justify-center max-w-7xl">
                <CardContent className="flex flex-col xl:flex-row gap-4 p-4">
                    <div className="flex justify-center items-center flex-shrink-0">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-[clamp(300px,50vw,500px)] h-auto object-contain"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl lg:text-3xl font-bold">
                            {product.name}
                        </h1>
                        <div className="flex gap-4 items-center">
                            <h2 className="text-xl font-semibold">
                                £{product.price.toFixed(2)}
                            </h2>
                            <p className={`${stockInfo.color} font-bold`}>{stockInfo.text}</p>
                        </div>
                        <div className="flex gap-2">
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
                            <Button size="sm" onClick={handleAddToBasket} disabled={isAddingToBasket || product.stock === 0}>
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                {isAddingToBasket ? "Adding..." : <span>Add to Basket</span>}
                            </Button>
                        </div>
                        <p className="text-base text-left whitespace-pre-line">
                            {product.description}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
