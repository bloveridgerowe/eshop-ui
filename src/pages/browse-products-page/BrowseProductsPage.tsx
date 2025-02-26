// src/pages/browse-products-page/BrowseProductsPage.tsx
import { useGetProducts } from "@/api/hooks/product-hooks";
import { ResultPage, ResultPageHeader, ResultPageMessage } from "@/pages/utility-pages/ResultPage";
import { ProductsFilters } from "@/components/feature/ProductsFilters";
import { ProductsBrowser } from "@/pages/browse-products-page/components/ProductsBrowser";
import {useFilters} from "@/hooks/use-filters.tsx";
import {useEffect} from "react";

export function BrowseProductsPage() {
    // Get global filter state and updater from our context.
    const { filters, setFilters } = useFilters();

    // Call our query hook with filters.
    // (Assume useGetProducts accepts an object with categoryId and priceRange.)
    const { data: products, isLoading, isError } = useGetProducts({
        // Optionally include searchQuery if stored globally
        categoryId: filters.categoryId,
        minPrice: filters.priceRange.minPrice,
        maxPrice: filters.priceRange.maxPrice,
    });

    useEffect(() => {
        if (products && products.length > 0 &&
            filters.priceRange.minPrice === 0 &&
            filters.priceRange.maxPrice === Infinity) {
            const prices = products.map((p) => p.price);
            const newMin = Math.min(...prices);
            const newMax = Math.max(...prices);
            setFilters({
                ...filters,
                priceRange: { minPrice: newMin, maxPrice: newMax },
            });
        }
    }, [products, filters, setFilters]);

    const handleFiltersChanged = (newFilters: typeof filters) => {
        setFilters(newFilters);
        // With React Query, updating filters (i.e. the query key) triggers a refetch.
    };

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
            <ProductsFilters filters={filters} onFiltersChanged={handleFiltersChanged} />
            <div className="flex-1">
                <ProductsBrowser products={products} showSkeleton={isLoading} />
            </div>
        </div>
    );
}
