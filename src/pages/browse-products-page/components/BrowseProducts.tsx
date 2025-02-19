import { useAuth } from "@/hooks/use-auth.tsx";
import { useSearchParams } from "react-router-dom";
import { useGetProducts } from "@/api/hooks/product-hooks.ts";
import { ResultPage, ResultPageHeader, ResultPageMessage } from "@/pages/result-page/ResultPage.tsx";
import { ProductGrid } from "@/pages/browse-products-page/components/ProductGrid.tsx";
import { ProductCard, ProductCardSkeleton } from "@/pages/browse-products-page/components/ProductCard.tsx";
import { useMaximumVisibleGridItems } from "@/hooks/use-maximum-visible-grid-items.tsx";

export function BrowseProducts() {
    const { user } = useAuth();
    const [ searchParams ] = useSearchParams();
    const searchQuery = searchParams.get("search") || undefined;
    const categoryId = searchParams.get("category") || undefined;
    const { data: products, isError } = useGetProducts({ searchQuery, categoryId });

    if (!products || products.length === 0) {
        return (
            <ResultPage variant="info">
                <ResultPageHeader>No products found.</ResultPageHeader>
                <ResultPageMessage>Try adjusting your search or browsing other categories.</ResultPageMessage>
            </ResultPage>
        );
    }

    if (isError) {
        return (
            <ResultPage variant="error">
                <ResultPageHeader>Failed to load products.</ResultPageHeader>
                <ResultPageMessage>Please try again later.</ResultPageMessage>
            </ResultPage>
        );
    }

    return (
        <ProductGrid>
            {/*<ProductCardSkeleton key="hi" />*/}
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

