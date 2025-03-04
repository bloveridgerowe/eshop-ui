import { ProductListingCardSkeleton, ProductListingCard } from "@/pages/browse-products-page/components/ProductListingCard";
import { Product } from "@/api/services/products-service";
import { useMaximumVisibleGridItems } from "@/hooks/use-maximum-visible-grid-items";

interface ProductGridProps {
    products?: Product[]
    showSkeleton?: boolean;
}

export function ProductGrid({ products = [], showSkeleton = false }: ProductGridProps) {
    const { gridRef, visibleItems } = useMaximumVisibleGridItems();

    return (
        <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 w-full p-2">
            {showSkeleton ? (
                Array.from({ length: visibleItems }).map((_, i) => (
                    <ProductListingCardSkeleton key={i} />
                ))
            ) : (
                products.map((product) => (
                    <ProductListingCard key={product.id} product={product}/>
                ))
            )}
        </div>
    );
}
