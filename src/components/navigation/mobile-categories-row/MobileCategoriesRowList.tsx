import { Link, useSearchParams } from "react-router-dom";
import { useGetCategories } from "@/api/hooks/category-hooks.ts";
import { getCategoryItems } from "@/utilities/categories.ts";
import { Button } from "@/components/shadcn/button";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/shadcn/skeleton";

export function MobileCategoriesRowList() {
    const [searchParams] = useSearchParams();
    const { data: categories } = useGetCategories();
    const selectedCategoryId = searchParams.get("category");
    const isFeatured = searchParams.has("featured");

    return (
        <div className="flex gap-2 p-2 overflow-x-auto whitespace-nowrap">
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
        </div>
    );
}

export function MobileCategoriesRowListSkeleton() {
    return (
        <div className="flex gap-2 p-2 overflow-x-auto whitespace-nowrap items-center">
            {Array.from({ length: 16 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-[7.2rem] rounded-lg flex-shrink-0" />
            ))}
        </div>
    );
}
