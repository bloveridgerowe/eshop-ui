import { useEffect, useMemo, useState } from "react";
import { useGetProducts } from "@/api/hooks/product-hooks";
import { ResultPage, ResultPageHeader, ResultPageMessage } from "@/pages/utility-pages/ResultPage";
import {PriceRange, ProductsFilters } from "@/components/feature/ProductsFilters";
import { ProductsBrowser } from "@/pages/browse-products-page/components/ProductsBrowser";

export function BrowseProductsPage() {
    // Separate state: boundaries vs. selection.
    const [boundaries, setBoundaries] = useState<PriceRange>({ min: 0, max: 1005 });
    const [selection, setSelection] = useState<PriceRange>({ min: 0, max: 1005 });
    const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

    // We always pass the boundaries (for filtering the query) to the server.
    const { data, isLoading, isError } = useGetProducts({
        categoryId,
        minPrice: boundaries.min,
        maxPrice: boundaries.max,
    });

    // When the query returns data, update the boundaries once.
    useEffect(() => {
        if (data && data.priceRange) {
            // Update boundaries to the correct values from the server.
            setBoundaries({
                min: data.priceRange.min,
                max: data.priceRange.max,
            });
            // Optionally, if the user hasn't adjusted the slider yet, also update the selection.
            setSelection({
                min: data.priceRange.min,
                max: data.priceRange.max,
            });
        }
    }, [data]);

    // Local filtering based on the user's selection. (If you need to filter client-side.)
    const filteredProducts = useMemo(() => {
        if (!data?.products) return [];
        return data.products.filter(
            (p) => p.price >= selection.min && p.price <= selection.max
        );
    }, [data, selection]);

    if (isError) {
        return (
            <ResultPage variant="error">
                <ResultPageHeader>Failed to load products.</ResultPageHeader>
                <ResultPageMessage>Please try again later.</ResultPageMessage>
            </ResultPage>
        );
    }

    // When the filters component notifies a change, update the selection and (if needed) the category.
    const handleFiltersChanged = (newFilters: { selection: PriceRange; categoryId?: string }) => {
        // Only update the selection and category; boundaries remain unchanged.
        setSelection(newFilters.selection);
        setCategoryId(newFilters.categoryId);
    };

    return (
        <div className="flex-1 flex flex-col md:flex-row items-stretch">
            <ProductsFilters
                filters={{ priceBoundaries: boundaries, priceSelection: selection, categoryId }}
                onFiltersChanged={handleFiltersChanged}
            />
            <div className="flex-1">
                <ProductsBrowser products={filteredProducts} showSkeleton={isLoading} />
            </div>
        </div>
    );
}
