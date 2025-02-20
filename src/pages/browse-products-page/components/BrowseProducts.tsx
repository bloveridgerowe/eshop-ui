import { useAuth } from "@/hooks/use-auth";
import { useSearchParams } from "react-router-dom";
import { useGetProducts } from "@/api/hooks/product-hooks.ts";
import { ResultPage, ResultPageHeader, ResultPageMessage } from "@/pages/result-page/ResultPage";
import { ProductGrid } from "@/pages/browse-products-page/components/ProductGrid";
import { ProductCard, ProductCardSkeleton } from "@/pages/browse-products-page/components/ProductCard";
import { useMaximumVisibleGridItems } from "@/hooks/use-maximum-visible-grid-items";

export function BrowseProducts() {
    const { user } = useAuth();
    const [ searchParams ] = useSearchParams();
    const searchQuery = searchParams.get("search") || undefined;
    const categoryId = searchParams.get("category") || undefined;
    const { data: products } = useGetProducts({ searchQuery, categoryId });

    if (!products || products.length === 0) {
        return (
            <ResultPage variant="info">
                <ResultPageHeader>No products found.</ResultPageHeader>
                <ResultPageMessage>Try adjusting your search or browsing other categories.</ResultPageMessage>
            </ResultPage>
        );
    }

    return (
        <ProductGrid>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} loggedIn={!!user} />
            ))}
        </ProductGrid>
    );
}

export function BrowseProductsSkeleton() {
    const { gridRef, visibleItems } = useMaximumVisibleGridItems();

    return (
        <ProductGrid ref={gridRef}>
            {Array.from({ length: visibleItems }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </ProductGrid>
    );
}

