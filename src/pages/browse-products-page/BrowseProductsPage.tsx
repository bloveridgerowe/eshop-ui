import {useLayoutEffect, useMemo, useState} from "react";
import { useGetProducts } from "@/api/hooks/product-hooks";
import { ResultPage, ResultPageHeader, ResultPageMessage } from "@/pages/utility-pages/ResultPage";
import {PriceRange, ProductsFilters } from "@/components/feature/ProductsFilters";
import { ProductsBrowser } from "@/pages/browse-products-page/components/ProductsBrowser";
import {useProductFilters} from "@/hooks/use-filters.tsx";

export function BrowseProductsPage() {
    // Separate state: boundaries vs. selection.
    const { category, priceRange, priceBoundaries, setFilters, setPriceBoundaries } = useProductFilters();

    console.log("products category", category);
    console.log("price range", priceRange);

    // We always pass the boundaries (for filtering the query) to the server.
    const { data, isLoading, isError } = useGetProducts({
        categoryId: category,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
    });

    useLayoutEffect(() => {
        if (data && data.priceRange) {
            const newBoundaries = { min: data.priceRange.min, max: data.priceRange.max };
            // console.log("newBoundaries", newBoundaries);

            // If the boundaries have changed...
            if (newBoundaries.min !== priceBoundaries.min || newBoundaries.max !== priceBoundaries.max) {
                setPriceBoundaries(newBoundaries);

                // initial range needs to be the boundaries
                // after that have at it

                setFilters(prevSelection => {
                    if (prevSelection.min === priceBoundaries.min && prevSelection.max === boundaripriceBoundarieses.max) {
                        return newBoundaries;
                    }
                    return prevSelection;
                });

            }
            // Category is not touched here—so it stays as the user last set it.
        }
    }, [data, priceBoundaries]);

    // Local filtering based on the user's selection. (If you need to filter client-side.)
    // const filteredProducts = useMemo(() => {
    //     if (!data?.products) return [];
    //     return data.products.filter(p => p.price >= selection.min && p.price <= selection.max);
    // }, [data, selection]);

    if (isError) {
        return (
            <ResultPage variant="error">
                <ResultPageHeader>Failed to load products.</ResultPageHeader>
                <ResultPageMessage>Please try again later.</ResultPageMessage>
            </ResultPage>
        );
    }

    return (
        <div className="flex-1 flex flex-col md:flex-row items-stretch">
            <ProductsFilters/>
            <div className="flex-1">
                <ProductsBrowser products={data?.products} showSkeleton={isLoading} />
            </div>
        </div>
    );
}
