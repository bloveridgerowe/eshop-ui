import { useNavigate, useSearchParams } from "react-router-dom";
import {ReactNode, Suspense, useEffect} from "react";
import {ProductCard, ProductCardSkeleton} from "@/pages/browse-products-page/components/ProductCard";
import { Paths } from "@/utilities/paths";
import { useGetProducts } from "@/api/hooks/product-hooks";
import { ResultPage, ResultPageHeader, ResultPageMessage } from "@/pages/result-page/ResultPage";
import { useAuth } from "@/hooks/use-auth";

export function BrowseProductsPage() {
    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams();
    const searchQuery = searchParams.get("search") || undefined;
    const categoryId = searchParams.get("category") || undefined;

    useEffect(() => {
        const hasValidParams = searchQuery || categoryId || searchParams.has("featured");

        if (!hasValidParams) {
            navigate(Paths.featured(), { replace: true });
        }
    }, [searchQuery, categoryId, searchParams, navigate]);

    return (
        <Suspense key={searchQuery || categoryId || "featured"} fallback={<BrowseProductsSkeleton />}>
            <BrowseProducts />
        </Suspense>
    );
}

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
            {products.map((product) => (
                <ProductCard key={product.id} product={product} loggedIn={!!user} />
            ))}
        </ProductGrid>
    );
}

export function BrowseProductsSkeleton() {
    const { gridRef, columns } = useVisibleGridCols();
    const rows = useSkeletonRowCount(gridRef, 1);

    return (
        <ProductGrid ref={gridRef}>
            {Array.from({ length: columns * rows }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </ProductGrid>
    );
}

import { forwardRef } from 'react';
import {useSkeletonRowCount, useVisibleGridCols} from "@/hooks/use-grid-column-count.tsx";
export const ProductGrid = forwardRef<HTMLDivElement, {children: ReactNode}>(
    ({children}, ref) => {
        return (
            <div ref={ref} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 w-full">
                {children}
            </div>
        );
    }
);
