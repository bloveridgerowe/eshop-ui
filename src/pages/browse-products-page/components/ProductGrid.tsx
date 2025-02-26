import { forwardRef } from "react";
import {ProductListingCard} from "@/pages/browse-products-page/components/ProductListingCard.tsx";
import {Product} from "@/api/services/products-service.ts";

interface ProductGridProps {
    products: Product[]
}

export const ProductGrid = forwardRef<HTMLDivElement, ProductGridProps>(({ products }, ref) => {
    return (
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 w-full p-2">
            {products.map((product) => (
                <ProductListingCard key={product.id} product={product}/>
            ))}
        </div>
    );
});
