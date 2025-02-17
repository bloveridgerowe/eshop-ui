import { Card, CardContent, CardFooter } from "@/components/shadcn/card";
import { cn } from "@/utilities/utils";
import { Product } from "@/api/services/products-service";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getStockDisplay } from "@/utilities/stock";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import { Paths } from "@/utilities/paths";
import { AddToBasketButton } from "@/pages/browse-products-page/components/AddToBasketButton";

export interface ProductCardProps {
    product: Product;
    loggedIn: boolean;
}

export function ProductCard({ product, loggedIn }: ProductCardProps) {
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
                    {product.stock > 0 && (
                        <div className="w-20">
                            <Select value={String(quantity)} onValueChange={(value) => setQuantity(Number(value))}>
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
                    <AddToBasketButton productId={product.id} quantity={quantity} loggedIn={loggedIn}/>
                </div>
            </CardFooter>
        </Card>
    );
}
