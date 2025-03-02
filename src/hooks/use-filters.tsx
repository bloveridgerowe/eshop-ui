import { createContext, useCallback, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {PriceRange, ProductFilters} from "@/api/services/products-service.ts";

interface ProductFiltersContextType {
    search: ProductFilters['search'];
    category: ProductFilters['category'];
    featured: ProductFilters['featured'];
    priceRange?: PriceRange;
    priceBoundaries?: PriceRange;
    setPriceBoundaries: (bounds: { min: number; max: number }) => void;
    setFilters: (filters: ProductFilters) => void;
}

// Creating the context
const ProductFiltersContext = createContext<ProductFiltersContextType | undefined>(undefined);

// **Provider Component**
export const ProductFiltersProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [priceBoundaries, setPriceBoundaries] = useState<PriceRange>();
    const search = searchParams.get('search') as ProductFilters['search'];
    const featured = Boolean(searchParams.get("featured"));
    const category = searchParams.get('category') as ProductFilters['category'];
    const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice') as string) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice') as string) : undefined;

    const priceRange = minPrice != null && maxPrice != null ? { min: minPrice, max: maxPrice } : undefined;

    const setFilters = useCallback((filters: ProductFilters) => {
        setSearchParams((params) => {
            if (filters.search) {
                params.set('search', filters.search);
            }
            if (filters.category) {
                params.delete('featured');
                params.delete('minPrice');
                params.delete('maxPrice');
                params.delete('search');
                params.set('category', filters.category);
            }
            if (filters.featured) {
                params.set('featured', true.toString());
                params.delete('search');
                params.delete('category');
                params.delete('minPrice');
                params.delete('maxPrice');
            }
            if (filters.priceRange) {
                params.set('minPrice', Math.floor(filters.priceRange.min).toString());
                params.set('maxPrice', Math.ceil(filters.priceRange.max).toString());
            }

            return params;
        });
    }, [ setSearchParams ]);

    return (
        <ProductFiltersContext.Provider value={{ search, featured, category, priceRange, priceBoundaries, setPriceBoundaries, setFilters }}>
            {children}
        </ProductFiltersContext.Provider>
    );
};

// **Custom Hook to Consume the Context**
export const useProductFilters = (): ProductFiltersContextType => {
    const context = useContext(ProductFiltersContext);
    if (!context) {
        throw new Error("useProductFilters must be used within a ProductFiltersProvider");
    }
    return context;
};
