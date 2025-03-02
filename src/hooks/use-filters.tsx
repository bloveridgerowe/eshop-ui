import { createContext, useCallback, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductFilters } from "@/api/services/products-service.ts";

interface ProductFiltersContextType {
    search: ProductFilters['search'];
    category: ProductFilters['category'];
    priceRange: { min: number; max: number };
    priceBoundaries: { min: number; max: number };
    setPriceBoundaries: (bounds: { min: number; max: number }) => void;
    setFilters: (filters: ProductFilters) => void;
}

// Creating the context
const ProductFiltersContext = createContext<ProductFiltersContextType | undefined>(undefined);

// **Provider Component**
export const ProductFiltersProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [priceBoundaries, setPriceBoundaries] = useState({ min: 0, max: 1050 });

    const search = searchParams.get('search') as ProductFilters['search'];
    const category = searchParams.get('category') as ProductFilters['category'];
    const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice') as string) : 0;
    const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice') as string) : 0;

    const priceRange = minPrice && maxPrice ? { min: minPrice, max: maxPrice } : { min: 0, max: 0 };

    const setFilters = useCallback((filters: ProductFilters) => {
        setSearchParams((params) => {
            if (filters.search !== undefined) {
                params.set('search', filters.search);
            }
            if (filters.category) {
                params.set('category', filters.category);
            }
            if (filters.priceRange) {
                params.set('minPrice', filters.priceRange.min.toString());
                params.set('maxPrice', filters.priceRange.max.toString());
            }
            return params;
        });
    }, []);

    return (
        <ProductFiltersContext.Provider value={{ search, category, priceRange, priceBoundaries, setPriceBoundaries, setFilters }}>
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
