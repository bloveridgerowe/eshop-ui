import { useQuery } from "@tanstack/react-query";
import { useServices } from "@/hooks/use-services";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Paths } from "@/utilities/Paths";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { errorToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";

export function MobileCategoriesRow() {
    const { categoryService } = useServices();
    const [ searchParams ] = useSearchParams();

    const selectedCategoryId = searchParams.get("category");
    const isFeatured = searchParams.has("featured");

    const { data: categories, isLoading, isError } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => categoryService.getCategories(),
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full border-b border-input p-2">
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
        <div className="border-b border-input w-full">
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