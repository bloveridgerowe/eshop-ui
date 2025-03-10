import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/utilities/utils";
import { Product } from "@/api/services/products-service";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getStockDisplay } from "@/utilities/stock";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Paths } from "@/utilities/paths";
import { AddToBasketButton } from "@/pages/browse-products-page/components/AddToBasketButton";
import { Skeleton } from "@/components/ui/skeleton";

export interface ProductListingCardProps {
    product: Product;
}

export function ProductListingCard({ product }: ProductListingCardProps) {
    const [ quantity, setQuantity ] = useState(product.stock > 0 ? 1 : 0);
    const stockInfo = getStockDisplay(product);
    const quantityOptions = Array.from({ length: product.stock }, (_, i) => i + 1);

    return (
        <Card>
            <div className="aspect-square relative">
                <Link to={Paths.product(product.id)}>
                    <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full rounded-t-lg"/>
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
                    <div className="w-20">
                        <Select value={String(quantity)} disabled={!product.stock} onValueChange={(value) => setQuantity(Number(value))}>
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
                    <AddToBasketButton productId={product.id} quantity={quantity} disabled={!product.stock}/>
                </div>
            </CardFooter>
        </Card>
    );
}

export function ProductListingCardSkeleton() {
    return (
        <Card>
            <div className="aspect-square relative">
                <Skeleton className="w-full h-full rounded-t-lg object-cover" />
            </div>
            <CardContent className="p-2 flex flex-col flex-1 gap-1">
                <Skeleton className="h-4 w-1/2 my-1" />
                <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/3" />
                </div>
            </CardContent>
            <CardFooter className="p-2 flex-col gap-2">
                <div className="flex items-center gap-2 w-full">
                    <Skeleton className="w-20 h-9" />
                    <Skeleton className="h-9 flex-1" />
                </div>
            </CardFooter>
        </Card>
    );
}
