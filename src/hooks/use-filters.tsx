// src/contexts/FiltersContext.tsx
import {createContext, useContext, useState, ReactNode, Dispatch, SetStateAction} from "react";

export interface PriceRange {
    min: number;
    max: number;
}

export interface Filters {
    priceBoundaries: PriceRange; // computed from products (available range)
    priceSelection: PriceRange;  // the user's selected range for filtering
    categoryId?: string;
}

interface FiltersContextProps {
    filters: Filters;
    setFilters: Dispatch<SetStateAction<Filters>>;
}

const FiltersContext = createContext<FiltersContextProps | undefined>(undefined);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
    const [filters, setFilters] = useState<Filters>({
        priceBoundaries: { min: 0, max: 1005 },
        priceSelection: { min: 0, max: 1005 },
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
