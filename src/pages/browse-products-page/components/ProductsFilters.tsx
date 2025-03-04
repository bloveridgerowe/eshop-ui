import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { PriceControl } from "@/components/feature/PriceControl";
import { useGetCategories } from "@/api/hooks/category-hooks";
import { useProductFilters } from "@/hooks/use-filters";
import { Skeleton } from "@/components/ui/skeleton";
import { Fragment } from "react";

const containerStyles = "px-2 flex flex-row md:flex-col w-full overflow-x-auto md:overflow-visible";
const filterSectionStyles = "flex flex-row md:flex-col w-full gap-2 px-2 overflow-x-auto md:overflow-visible";
const filterWrapperStyles = "w-full h-12 md:h-14 flex flex-col bg-secondary p-2 md:pb-3 rounded justify-center";

export function ProductsFilters() {
    const { priceBoundaries, filters } = useProductFilters();
    const { isLoading } = useGetCategories();

    return (
        <aside className="w-full py-2 md:w-48 flex flex-col border-b md:border-r mb-2 md:mb-0 gap-2 border-input md:min-w-[200px]">
            {priceBoundaries && filters.priceRange && !isLoading ? (
                <ProductsFiltersList />
            ) : (
                <ProductsFiltersListSkeleton />
            )}
        </aside>
    );
}

export function ProductsFiltersList() {
    const { priceBoundaries, filters, setFilters } = useProductFilters();
    const { data: categories = [] } = useGetCategories();

    return (
        <Fragment>
            <section className={`${containerStyles} border-b pb-2`}>
                <div className={filterWrapperStyles}>
                    <PriceControl
                        availableMin={priceBoundaries?.min ?? 0}
                        availableMax={priceBoundaries?.max ?? 1}
                        value={[filters.priceRange?.min ?? 0, filters.priceRange?.max ?? 1]}
                        onChange={(min, max) => setFilters({ priceRange: { min, max } })}
                    />
                </div>
            </section>
            <section className={filterSectionStyles}>
                <Button
                    key="featured"
                    variant={filters.featured ? "default" : "secondary"}
                    className="whitespace-nowrap flex items-center gap-2"
                    onClick={() => setFilters({ featured: !filters.featured, priceRange: undefined })}
                >
                    <Star className="w-4 h-4" />
                    Featured
                </Button>
                {categories.map((c) => (
                    <Button
                        key={c.id}
                        variant={filters.category === c.id ? "default" : "secondary"}
                        className="whitespace-nowrap flex items-center gap-2"
                        onClick={() => setFilters({ category: c.id, priceRange: undefined, search: undefined })}
                    >
                        {c.id === "featured" && <Star className="w-4 h-4" />}
                        {c.name}
                    </Button>
                ))}
            </section>
        </Fragment>
    );
}

export function ProductsFiltersListSkeleton() {
    return (
        <Fragment>
            <section className={`${containerStyles} border-b pb-2`}>
                <div className={filterWrapperStyles}>
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </section>
            <section className={filterSectionStyles}>
                {Array.from({ length: 16 }).map((_, i) => (
                    <Button disabled key={i} variant="secondary" className="whitespace-nowrap flex items-center gap-2">
                        <Skeleton className="h-4 w-16" />
                    </Button>
                ))}
            </section>
        </Fragment>
    );
}
