import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { PriceControl } from "@/components/feature/PriceControl";
import { useGetCategories } from "@/api/hooks/category-hooks";
import { getCategoryItems } from "@/utilities/categories";
import {useProductFilters} from "@/hooks/use-filters.tsx";

export function ProductsFilters() {
    const { priceBoundaries, priceRange, category, setFilters } = useProductFilters();
    const { data: categories } = useGetCategories();
    const categoryItems = getCategoryItems(categories);

    console.log("priceBoundaries NOW ", priceBoundaries);

    return (
        <aside className="w-full py-2 md:w-48 flex flex-col border-b md:border-r mb-2 md:mb-0 gap-2 border-input">
            <section className="px-2 flex flex-row md:flex-col w-full overflow-x-auto md:overflow-visible border-b pb-2">
                <div className="w-full h-12 flex flex-col bg-secondary p-2 rounded justify-center">
                    <PriceControl
                        availableMin={priceBoundaries.min}
                        availableMax={priceBoundaries.max}
                        value={[priceRange.min, priceRange.max]}
                        onChange={(minValue, maxValue) =>{
                            setFilters({
                                priceRange: {
                                    min: minValue,
                                    max: maxValue,
                                }
                            })
                        }}
                    />
                </div>
            </section>
            <section className="flex flex-row md:flex-col w-full gap-2 px-2 overflow-x-auto md:overflow-visible">
                {categoryItems.map((c) => {
                    const isSelected = category === c.id;
                    return (
                        <Button
                            key={c.id}
                            variant={isSelected ? "default" : "secondary"}
                            className="whitespace-nowrap flex items-center gap-2"
                            onClick={() => setFilters({
                                category: c.id
                            })}
                        >
                            {c.id === "featured" && <Star className="w-4 h-4" />}
                            {c.name}
                        </Button>
                    );
                })}
            </section>
        </aside>
    );
}
