import { Link, useSearchParams } from "react-router-dom";
import { useGetCategories } from "@/api/hooks/category-hooks.ts";
import { getCategoryItems } from "@/utilities/categories.ts";
import { Button } from "@/components/ui/button.tsx";
import {Banknote, Star} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export function ProductsFilters() {
    const [searchParams] = useSearchParams();
    const { data: categories } = useGetCategories();
    const selectedCategoryId = searchParams.get("category");
    const isFeatured = searchParams.has("featured");

    // TODO: Loading skeleton

    return (
        <aside className="w-full py-2 md:w-48 flex flex-col border-b md:border-r mb-2 md:mb-0 gap-2 border-input">
            <section className="px-2 flex flex-row md:flex-col w-full overflow-x-auto md:overflow-visible border-b pb-2">
                <div className="w-full h-12 flex flex-col bg-secondary p-2 rounded justify-center">
                    {/*<div className="flex flex-row items-center justify-center gap-2 mb-1.5">*/}
                    {/*    <Banknote className="w-[1.1rem] h-[1.1rem]"/>*/}
                    {/*    <label className="">Price Range</label>*/}
                    {/*</div>*/}
                    <div className="flex items-center space-x-2 mx-1">
                        <span className="text-sm text-gray-600">£0</span>
                        <input type="range" min="0" max="1000" value="500" className="w-full"/>
                        <span className="text-sm">£1000</span>
                    </div>
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
