import {Link, useSearchParams} from "react-router-dom";
import {useGetCategories} from "@/api/hooks/category-hooks.ts";
import {getCategoryItems} from "@/utilities/categories.ts";
import {Button} from "@/components/shadcn/button.tsx";
import {Star} from "lucide-react";

export function CategoriesSideBarList() {
    const [searchParams] = useSearchParams();
    const { data: categories, isError } = useGetCategories();
    const selectedCategoryId = searchParams.get("category");
    const isFeatured = searchParams.has("featured");

    if (isError) return null;

    return (
        <ul className="space-y-2">
            {getCategoryItems(categories).map(category => {
                const isSelected = category.id === selectedCategoryId || (category.id === "featured" && isFeatured);
                return (
                    <li key={category.id}>
                        <Link to={category.path}>
                            <Button
                                className="justify-start px-2 whitespace-nowrap flex items-center gap-2"
                                variant={isSelected ? "default" : "ghost"}
                            >
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
