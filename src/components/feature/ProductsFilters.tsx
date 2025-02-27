// src/components/feature/ProductsFilters.tsx
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { PriceControl } from "@/components/feature/PriceControl";
import { useGetCategories } from "@/api/hooks/category-hooks";
import { getCategoryItems } from "@/utilities/categories";
import {Filters} from "@/hooks/use-filters.tsx";


export interface ProductsFiltersProps {
    filters: Filters;
    onFiltersChanged: (filters: Filters) => void;
}

export function ProductsFilters({ filters, onFiltersChanged }: ProductsFiltersProps) {
    const { data: categories } = useGetCategories();
    const categoryItems = getCategoryItems(categories);

    const handlePriceChange = (minValue: number, maxValue: number) => {
        onFiltersChanged({
            ...filters,
            // Only update the selection; the boundaries remain based on the results.
            priceSelection: { min: minValue, max: maxValue },
        });
    };

    const handleCategoryClick = (categoryId: string) => {
        onFiltersChanged({
            ...filters,
            categoryId: filters.categoryId === categoryId ? undefined : categoryId,
        });
    };

    return (
        <aside className="w-full py-2 md:w-48 flex flex-col border-b md:border-r mb-2 md:mb-0 gap-2 border-input">
            <section className="px-2 flex flex-row md:flex-col w-full overflow-x-auto md:overflow-visible border-b pb-2">
                <div className="w-full h-12 flex flex-col bg-secondary p-2 rounded justify-center">
                    <PriceControl
                        availableMin={filters.priceBoundaries.min}
                        availableMax={filters.priceBoundaries.max}
                        value={[filters.priceSelection.min, filters.priceSelection.max]}
                        onChange={handlePriceChange}
                    />
                </div>
            </section>
            <section className="flex flex-row md:flex-col w-full gap-2 px-2 overflow-x-auto md:overflow-visible">
                {categoryItems.map((category) => {
                    const isSelected = filters.categoryId === category.id;
                    return (
                        <Button
                            key={category.id}
                            variant={isSelected ? "default" : "secondary"}
                            className="whitespace-nowrap flex items-center gap-2"
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            {category.id === "featured" && <Star className="w-4 h-4" />}
                            {category.name}
                        </Button>
                    );
                })}
            </section>
        </aside>
    );
}
