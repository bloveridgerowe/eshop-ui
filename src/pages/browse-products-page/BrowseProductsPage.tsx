// src/pages/browse-products-page/BrowseProductsPage.tsx
import { useEffect, useMemo } from "react";
import { useGetProducts } from "@/api/hooks/product-hooks";
import { ResultPage, ResultPageHeader, ResultPageMessage } from "@/pages/utility-pages/ResultPage";
import { ProductsFilters } from "@/components/feature/ProductsFilters";
import { ProductsBrowser } from "@/pages/browse-products-page/components/ProductsBrowser";
import { minBy, maxBy } from "lodash";
import {Filters, useFilters} from "@/hooks/use-filters.tsx";

export function BrowseProductsPage() {
    const { filters, setFilters } = useFilters();
    console.log(filters);

    // Query for products based on search and category.
    // This query returns the full dataset for search+category (ignoring price).
    const boundaryQueryParams = useMemo(() => ({ categoryId: filters.categoryId }), [filters.categoryId]);
    const { data: allProducts, isLoading, isError } = useGetProducts(boundaryQueryParams);

    // When allProducts load, update the available boundaries.
    useEffect(() => {
        if (allProducts && allProducts.length > 0) {
            const newMin = minBy(allProducts, (p) => p.price)?.price ?? 0;
            const newMax = maxBy(allProducts, (p) => p.price)?.price ?? Infinity;
            setFilters((prev: Filters) => ({
                ...prev,
                priceBoundaries: { min: newMin, max: newMax },
                // Only update the selection if it still matches the old boundaries.
                priceSelection:
                    prev.priceSelection.min === prev.priceBoundaries.min &&
                    prev.priceSelection.max === prev.priceBoundaries.max
                        ? { min: newMin, max: newMax }
                        : prev.priceSelection,
            }));
        }
    }, [allProducts, setFilters]);

    // Filter products locally based on the user's price selection.
    const filteredProducts = useMemo(() => {
        if (!allProducts) {
            return [];
        }
        return allProducts.filter((p) =>
            p.price >= filters.priceSelection.min &&
            p.price <= filters.priceSelection.max);
    }, [allProducts, filters.priceSelection]);

    if (isError) {
        return (
            <ResultPage variant="error">
                <ResultPageHeader>Failed to load products.</ResultPageHeader>
                <ResultPageMessage>Please try again later.</ResultPageMessage>
            </ResultPage>
        );
    }

    const handleFiltersChanged = (newFilters: typeof filters) => {
        console.log(newFilters);
        setFilters(newFilters);
        // Since filtering is local, the filteredProducts are recalculated automatically.
    };

    return (
        <div className="flex-1 flex flex-col md:flex-row items-stretch">
            <ProductsFilters filters={filters} onFiltersChanged={handleFiltersChanged} />
            <div className="flex-1">
                <ProductsBrowser products={filteredProducts} showSkeleton={isLoading} />
            </div>
        </div>
    );
}
