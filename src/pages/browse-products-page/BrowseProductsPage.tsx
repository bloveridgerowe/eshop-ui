import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Paths } from "@/utilities/paths";
import {useGetProducts} from "@/api/hooks/product-hooks.ts";
import {useMaximumVisibleGridItems} from "@/hooks/use-maximum-visible-grid-items.tsx";
import {ProductGrid} from "@/pages/browse-products-page/components/ProductGrid.tsx";
import { ProductCardSkeleton} from "@/pages/browse-products-page/components/ProductListingCard.tsx";
import {ResultPage, ResultPageHeader, ResultPageMessage} from "@/pages/utility-pages/ResultPage.tsx";

export function BrowseProductsPage() {
    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams();
    const searchQuery = searchParams.get("search") || undefined;
    const categoryId = searchParams.get("category") || undefined;
    const { data: products, isLoading, isError } = useGetProducts({ searchQuery, categoryId });

    useEffect(() => {
        const hasValidParams = searchQuery || categoryId || searchParams.has("featured");

        if (!hasValidParams) {
            navigate(Paths.featured(), { replace: true });
        }
    }, [searchQuery, categoryId, searchParams, navigate]);

    if (isLoading) {
        return (
            <ProductsGridSkeleton/>
        );
    }

    if (isError) {
        return (
            <ResultPage variant="error">
                <ResultPageHeader>Failed to load products.</ResultPageHeader>
                <ResultPageMessage>Please try again later.</ResultPageMessage>
            </ResultPage>
        )
    }

    if (!products || products.length === 0) {
        return (
            <ResultPage variant="info">
                <ResultPageHeader>No products found.</ResultPageHeader>
                <ResultPageMessage>Try adjusting your search or browsing other categories.</ResultPageMessage>
            </ResultPage>
        );
    }

    return (
        <ProductGrid products={products} />
    );
}

export function ProductsGridSkeleton() {
    const { gridRef, visibleItems } = useMaximumVisibleGridItems();

    return (
        <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 w-full p-2">
            {Array.from({ length: visibleItems }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    )
}


