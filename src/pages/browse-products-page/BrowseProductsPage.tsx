import { useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { Paths } from "@/utilities/paths";
import {useGetProducts} from "@/api/hooks/product-hooks.ts";
import {ResultPage, ResultPageHeader, ResultPageMessage} from "@/pages/utility-pages/ResultPage.tsx";
import {Filters, ProductsFilters} from "@/components/feature/ProductsFilters.tsx";
import {ProductsBrowser} from "@/pages/browse-products-page/components/ProductsBrowser.tsx";
import {filter, maxBy, minBy} from "lodash";

export function BrowseProductsPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || undefined;
    const categoryId = searchParams.get("category") || undefined;
    const { data: products, isLoading, isError } = useGetProducts({ searchQuery, categoryId });

    const [filters, setFilters] = useState<Filters>({
        priceRange: { minPrice: 0, maxPrice: Infinity },
    });

    useEffect(() => {
        if (products && products.length > 0) {
            const newMinPrice = minBy(products, p => p.price)?.price ?? 0;
            const newMaxPrice = maxBy(products, p => p.price)?.price ?? Infinity;

            setFilters(prev => ({
                ...prev,
                priceRange: { minPrice: newMinPrice, maxPrice: newMaxPrice },
            }));
        }
    }, [ products ]);

    useEffect(() => {
        const hasValidParams = searchQuery || categoryId || searchParams.has("featured");

        if (!hasValidParams) {
            navigate(Paths.featured(), { replace: true });
        }
    }, [ searchQuery, categoryId, searchParams, navigate ]);

    const filteredProducts = filter(products, p => p.price >= filters.priceRange.minPrice && p.price <= filters.priceRange.maxPrice);

    const handleFiltersChanged = (newFilters: Filters) => {
        setFilters(newFilters);
    };

    const renderProducts = () => {
        if (isError) {
            return (
                <ResultPage variant="error">
                    <ResultPageHeader>Failed to load products.</ResultPageHeader>
                    <ResultPageMessage>Please try again later.</ResultPageMessage>
                </ResultPage>
            );
        }

        return (
            <>
                <ProductsFilters filters={filters} onFiltersChanged={handleFiltersChanged} />
                <div className="flex-1">
                    <ProductsBrowser products={filteredProducts} showSkeleton={isLoading} />
                </div>
            </>
        );
    };

    return (
        <div className="flex-1 flex flex-col md:flex-row items-stretch">
            {renderProducts()}
        </div>
    );
}


