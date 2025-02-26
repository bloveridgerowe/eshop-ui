import { Link, useSearchParams } from "react-router-dom";
import { useGetCategories } from "@/api/hooks/category-hooks.ts";
import { getCategoryItems } from "@/utilities/categories.ts";
import { Button } from "@/components/ui/button.tsx";
import { Star} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import {PriceControl} from "@/components/feature/PriceControl.tsx";

export interface PriceRange {
    minPrice: number;
    maxPrice: number;
}

export interface Filters {
    priceRange: PriceRange;
}

export interface ProductsFiltersProps {
    filters: Filters;
    onFiltersChanged: (filters: Filters) => void;
}

export function ProductsFilters({ filters, onFiltersChanged }: ProductsFiltersProps) {
    const [searchParams] = useSearchParams();
    const { data: categories } = useGetCategories();
    const selectedCategoryId = searchParams.get("category");
    const isFeatured = searchParams.has("featured");

    const handlePriceChange = (minValue: number, maxValue: number) => {
        onFiltersChanged({
            ...filters,
            priceRange: {
                minPrice: minValue,
                maxPrice: maxValue,
            },
        });
    };

    return (
        <aside className="w-full py-2 md:w-48 flex flex-col border-b md:border-r mb-2 md:mb-0 gap-2 border-input">
            <section className="px-2 flex flex-row md:flex-col w-full overflow-x-auto md:overflow-visible border-b pb-2">
                <div className="w-full h-12 flex flex-col bg-secondary p-2 rounded justify-center">
                    <PriceControl minValue={filters.priceRange.minPrice} maxValue={filters.priceRange.maxPrice} onChange={handlePriceChange}/>
                </div>
            </section>
            <section className="flex flex-row md:flex-col w-full gap-2 px-2 overflow-x-auto md:overflow-visible">
                {getCategoryItems(categories).map(category => {
                    const isSelected = category.id === selectedCategoryId || (category.id === "featured" && isFeatured);
                    return (
                        <Link to={category.path} key={category.id}>
                            <Button variant={isSelected ? "default" : "secondary"} className="whitespace-nowrap flex items-center gap-2">
                                {category.id === "featured" && <Star className="w-4 h-4" />}
                                {category.name}
                            </Button>
                        </Link>
                    );
                })}
            </section>
        </aside>
    );
}

export function CategoriesSideBarListSkeleton() {
    return (
        <ul className="flex flex-col gap-3">
            {Array.from({ length: 16 }).map((_, i) => (
                <li key={i}>
                    <Skeleton className="h-10 w-[7.2rem] rounded-lg" />
                </li>
            ))}
        </ul>
    );
}
