import { Link, useSearchParams } from "react-router-dom";
import { useGetCategories } from "@/api/hooks/category-hooks.ts";
import { getCategoryItems } from "@/utilities/categories.ts";
import { Button } from "@/components/shadcn/button";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/shadcn/skeleton";

export function CategoriesSideBarList() {
    const [searchParams] = useSearchParams();
    const { data: categories } = useGetCategories();
    const selectedCategoryId = searchParams.get("category");
    const isFeatured = searchParams.has("featured");

    return (
        <ul className="flex flex-col gap-3">
            {getCategoryItems(categories).map(category => {
                const isSelected = category.id === selectedCategoryId || (category.id === "featured" && isFeatured);
                return (
                    <li key={category.id}>
                        <Link to={category.path}>
                            <Button className="justify-start whitespace-nowrap flex items-center gap-2" variant={isSelected ? "default" : "secondary"}>
                                {category.id === "featured" && (
                                    <Star className="w-4 h-4" />
                                )}
                                {category.name}
                            </Button>
                        </Link>
                    </li>
                );
            })}
        </ul>
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
