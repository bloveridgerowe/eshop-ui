import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Paths } from "@/utilities/paths";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useToast } from "@/components/ui/use-toast";
import { Star } from "lucide-react";
import { useGetCategories } from "@/api/hooks/category-hooks.ts";

export function MobileCategoriesRow() {
    const [ searchParams ] = useSearchParams();
    const { data: categories, isLoading, isError } = useGetCategories();
    const { errorToast } = useToast();

    const selectedCategoryId = searchParams.get("category");
    const isFeatured = searchParams.has("featured");

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full border-b border-input p-2 min-h-[var(--mobile-categories-height)]">
                <LoadingSpinner className="w-6 h-6 text-muted-foreground" />
            </div>
        );
    }

    if (isError) {
        errorToast("Failed to load categories. Please try again later.");
        return;
    }

    const featuredCategorySidebarItem = {
        id: "featured",
        name: "Featured",
        path: Paths.featured()
    };

    const categoriesSidebarItems = (categories ?? []).map(cat => ({
        ...cat,
        path: Paths.categories(cat.id)
    }));

    const allCategorySidebarItems = [ featuredCategorySidebarItem, ...categoriesSidebarItems ];

    return (
        <div className="border-b border-input w-full min-h-[var(--mobile-categories-height)]">
            <div className="flex gap-2 p-2 overflow-x-auto whitespace-nowrap">
                {allCategorySidebarItems.map((category) => {
                    const isSelected = category.id === selectedCategoryId || (category.id === "featured" && isFeatured);
                    return (
                        <Link to={category.path} key={category.id}>
                            <Button
                                variant={isSelected ? "default" : "ghost"}
                                className="whitespace-nowrap flex items-center gap-2">
                                {category.id === "featured" && <Star className="w-4 h-4" />}
                                {category.name}
                            </Button>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
