import { Card, CardContent } from "@/components/shadcn/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import { AddToBasketButton } from "@/pages/product-page/components/AddToBasketButton";
import { useEffect, useState } from "react";
import { useGetProduct } from "@/api/hooks/product-hooks.ts";
import { Link } from "react-router-dom";
import { ResultPage, ResultPageActions, ResultPageHeader, ResultPageMessage } from "@/pages/utility-pages/ResultPage";
import { Paths } from "@/utilities/paths.ts";
import { Button } from "@/components/shadcn/button";
import { getStockDisplay } from "@/utilities/stock.ts";

interface ProductCardProps {
    id: string;
}

export function ProductCard({ id }: ProductCardProps) {
    const [quantity, setQuantity] = useState(1);
    const { data: product } = useGetProduct(id);

    useEffect(() => {
        if (product && product.stock === 0) {
            setQuantity(0);
        }
    }, [ product ]);

    if (!id || !product) {
        return (
            <ResultPage variant="error">
                <ResultPageHeader>Product not found.</ResultPageHeader>
                <ResultPageMessage>We couldn’t find the product you’re looking for.</ResultPageMessage>
                <ResultPageActions>
                    <Link to={Paths.featured()}>
                        <Button className="w-full">Continue Shopping</Button>
                    </Link>
                </ResultPageActions>
            </ResultPage>
        );
    }

    const stockInfo = getStockDisplay(product);
    const quantityOptions = Array.from({ length: product.stock }, (_, i) => i + 1);

    return (
        <Card className="flex items-center justify-center max-w-7xl">
            <CardContent className="flex flex-col xl:flex-row gap-4 p-4">
                <div className="flex justify-center items-center flex-shrink-0">
                    <img src={product.imageUrl} alt={product.name} className="w-[clamp(300px,50vw,500px)] h-auto object-contain" />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl lg:text-3xl font-bold">{product.name}</h1>
                    <div className="flex gap-4 items-center">
                        <h2 className="text-xl font-semibold">£{product.price.toFixed(2)}</h2>
                        <p className={`${stockInfo.color} font-bold`}>{stockInfo.text}</p>
                    </div>
                    <div className="flex gap-2">
                        {product.stock > 0 && (
                            <>
                                <div className="w-20">
                                    <Select value={String(quantity)} onValueChange={(value) => setQuantity(Number(value))}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Qty" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {quantityOptions.map((option) => (
                                                <SelectItem key={option} value={String(option)}>{option}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <AddToBasketButton quantity={quantity} productId={product.id} />
                            </>
                        )}
                    </div>
                    <p className="text-base text-left whitespace-pre-line">{product.description}</p>
                </div>
            </CardContent>
        </Card>
    );
}
