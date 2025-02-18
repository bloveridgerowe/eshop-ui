import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/shadcn/button";
import { LoadingSpinner, LoadingSpinnerContainer } from "@/components/ui/LoadingSpinner";
import { Star } from "lucide-react";
import { useGetCategories } from "@/api/hooks/category-hooks";
import { getCategoryItems } from "@/utilities/categories";

export function MobileCategoriesRow() {
    const [ searchParams ] = useSearchParams();
    const { data: categories, isLoading, isError } = useGetCategories();
    const selectedCategoryId = searchParams.get("category");
    const isFeatured = searchParams.has("featured");

    if (isLoading) {
        return (
            <LoadingSpinnerContainer className="items-center w-full border-b border-input p-2 min-h-[var(--mobile-categories-height)]">
                <LoadingSpinner className="w-6 h-6" />
            </LoadingSpinnerContainer>
        );
    }

    return (
        <div className="border-b border-input w-full min-h-[var(--mobile-categories-height)]">
            {(!isError && categories) && (
                <div className="flex gap-2 p-2 overflow-x-auto whitespace-nowrap">
                    {getCategoryItems(categories).map(category => {
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
            ) }
        </div>
    );
}
