import { useLayoutEffect } from "react";
import { useGetProducts } from "@/api/hooks/product-hooks";
import { ResultPage, ResultPageHeader, ResultPageMessage } from "@/pages/utility-pages/ResultPage";
import { ProductsFilters } from "@/components/feature/ProductsFilters";
import { ProductsBrowser } from "@/pages/browse-products-page/components/ProductsBrowser";
import { useProductFilters } from "@/hooks/use-filters.tsx";

export function BrowseProductsPage() {
    const { category, priceRange, priceBoundaries, setPriceBoundaries } = useProductFilters();

    console.log("products category", category);
    console.log("price range", priceRange);

    const { data, isLoading, isError } = useGetProducts({ category, priceRange });

    useLayoutEffect(() => {
        if (data && data.priceRange) {
            const newBoundaries = { min: data.priceRange.min, max: data.priceRange.max };

            if (newBoundaries.min !== priceBoundaries.min || newBoundaries.max !== priceBoundaries.max) {
                setPriceBoundaries(newBoundaries);
            }
        }
    }, [data, priceBoundaries, setPriceBoundaries]);

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
