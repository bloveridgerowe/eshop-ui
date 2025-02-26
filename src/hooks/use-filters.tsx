// src/contexts/FiltersContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

export interface PriceRange {
    minPrice: number;
    maxPrice: number;
}

export interface Filters {
    priceRange: PriceRange;
    categoryId?: string;
    // (optionally, you could include searchQuery here if needed)
}

interface FiltersContextProps {
    filters: Filters;
    setFilters: (filters: Filters) => void;
}

const FiltersContext = createContext<FiltersContextProps | undefined>(undefined);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
    const [filters, setFilters] = useState<Filters>({
        priceRange: { minPrice: 0, maxPrice: Infinity },
        categoryId: undefined,
    });
    return (
        <FiltersContext.Provider value={{ filters, setFilters }}>
            {children}
        </FiltersContext.Provider>
    );
};

export function useFilters() {
    const context = useContext(FiltersContext);
    if (!context) {
        throw new Error("useFilters must be used within a FiltersProvider");
    }
    return context;
}
