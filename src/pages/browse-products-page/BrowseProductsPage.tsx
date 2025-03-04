import { useLayoutEffect } from "react";
import { useGetProducts } from "@/api/hooks/product-hooks";
import { ResultPage, ResultPageHeader, ResultPageMessage } from "@/pages/utility-pages/ResultPage";
import { ProductsFilters } from "@/pages/browse-products-page/components/ProductsFilters";
import { ProductsBrowser } from "@/pages/browse-products-page/components/ProductsBrowser";
import { useProductFilters } from "@/hooks/use-filters";

export function BrowseProductsPage() {
    const { filters, priceBoundaries, setFilters, setPriceBoundaries } = useProductFilters();
    const { data, isLoading, isError } = useGetProducts({ category: filters.category, priceRange: filters.priceRange, search: filters.search });

    useLayoutEffect(() => {
        if (!filters.category && !filters.search && !filters.featured) {
            setFilters({ featured: true });
        }

        // the price boundaries for the current query come from the server
        // once we've received the data, we set the boundaries so the price slider can update

        if (data && data.priceRange) {
            if (data.priceRange.min !== priceBoundaries?.min || data.priceRange.max !== priceBoundaries?.max) {
                setPriceBoundaries({ min: data.priceRange.min, max: data.priceRange.max });
            }
            if (!filters.priceRange) {
                setFilters({ priceRange: { min: data.priceRange.min, max: data.priceRange.max } });
            }
        }
    }, [ filters, data, priceBoundaries, setFilters, setPriceBoundaries ]);

    if (isError) {
        return (
            <ResultPage variant="error">
                <ResultPageHeader>Failed to load products.</ResultPageHeader>
                <ResultPageMessage>Please try again later.</ResultPageMessage>
            </ResultPage>
        );
    }

    return (
        <div className="flex-1 flex flex-col md:flex-row items-stretch h-full">
            <ProductsFilters/>
            <div className="flex-1">
                <ProductsBrowser products={data?.products} showSkeleton={!data || isLoading || !filters.priceRange}/>
            </div>
        </div>
    );
}
