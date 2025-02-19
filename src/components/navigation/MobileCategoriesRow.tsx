import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/shadcn/button";
import { Star } from "lucide-react";
import { Suspense } from "react";
import { useGetCategories } from "@/api/hooks/category-hooks";
import { getCategoryItems } from "@/utilities/categories";
import { Skeleton } from "@/components/shadcn/skeleton";

// MobileCategoriesRow wraps its list in a Suspense boundary so that only the mobile row suspends
export function MobileCategoriesRow() {
    return (
        <Suspense fallback={<MobileCategoriesRowListSkeleton />}>
            <MobileCategoriesRowList />
        </Suspense>
    );
}

// This component contains the mobile version of the categories list.
// It relies on useGetCategories which is configured to suspend (e.g. via useSuspenseQuery).
export function MobileCategoriesRowList() {
    const [searchParams] = useSearchParams();
    const { data: categories, isError } = useGetCategories();
    const selectedCategoryId = searchParams.get("category");
    const isFeatured = searchParams.has("featured");

    if (isError) return null;

    return (
        <div className="border-b border-input w-full min-h-[var(--mobile-categories-height)]">
            <div className="flex gap-2 p-2 overflow-x-auto whitespace-nowrap">
                {getCategoryItems(categories).map(category => {
                    const isSelected =
                        category.id === selectedCategoryId ||
                        (category.id === "featured" && isFeatured);
                    return (
                        <Link to={category.path} key={category.id}>
                            <Button
                                variant={isSelected ? "default" : "ghost"}
                                className="whitespace-nowrap flex items-center gap-2"
                            >
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

// Skeleton fallback for the mobile categories row.
// This replicates the container styling and shows a placeholder (using a Skeleton) while the data loads.
export function MobileCategoriesRowListSkeleton() {
    return (
        <div className="border-b border-input w-full min-h-[var(--mobile-categories-height)] flex items-center justify-center">
            <Skeleton className="w-6 h-6" />
        </div>
    );
}
