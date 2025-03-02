import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { PriceControl } from "@/components/feature/PriceControl";
import { useGetCategories } from "@/api/hooks/category-hooks";
import { useProductFilters } from "@/hooks/use-filters.tsx";

export function ProductsFilters() {
    const { priceBoundaries, priceRange, category, featured, setFilters } = useProductFilters();
    const { data: categories = [], isLoading } = useGetCategories();

    console.log(priceBoundaries);

    return (
        <aside className="w-full py-2 md:w-48 flex flex-col border-b md:border-r mb-2 md:mb-0 gap-2 border-input md:min-w-[200px]">
            {(priceBoundaries && priceRange && !isLoading) && (
                <>
                    <section className="px-2 flex flex-row md:flex-col w-full overflow-x-auto md:overflow-visible border-b pb-2">
                        <div className="w-full h-12 flex flex-col bg-secondary p-2 rounded justify-center">
                            {(
                                <PriceControl
                                    availableMin={priceBoundaries?.min ?? 0}
                                    availableMax={priceBoundaries?.max ?? 1}
                                    value={[priceRange?.min ?? 0, priceRange?.max ?? 1]}
                                    onChange={(minValue, maxValue) =>{
                                        setFilters({
                                            priceRange: {
                                                min: minValue,
                                                max: maxValue,
                                            }
                                        })
                                    }}
                                />
                            )}
                        </div>
                    </section>
                    <section className="flex flex-row md:flex-col w-full gap-2 px-2 overflow-x-auto md:overflow-visible">
                        <Button
                            key="featured"
                            variant={featured ? "default" : "secondary"}
                            className="whitespace-nowrap flex items-center gap-2"
                            onClick={() => setFilters({ featured: !featured, priceRange: undefined })}>
                            <Star className="w-4 h-4" />
                            Featured
                        </Button>
                        {categories.map((c) => {
                            const isSelected = category === c.id;
                            return (
                                <Button
                                    key={c.id}
                                    variant={isSelected ? "default" : "secondary"}
                                    className="whitespace-nowrap flex items-center gap-2"
                                    onClick={() => setFilters({ category: c.id, priceRange: undefined, search: undefined })}
                                >
                                    {c.id === "featured" && <Star className="w-4 h-4" />}
                                    {c.name}
                                </Button>
                            );
                        })}
                    </section>
                </>
            )}
        </aside>
    );
}
