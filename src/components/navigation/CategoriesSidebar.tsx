import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/shadcn/button";
import { LoadingSpinner, LoadingSpinnerContainer } from "@/components/ui/LoadingSpinner";
import { Star } from "lucide-react";
import { useGetCategories } from "@/api/hooks/category-hooks";
import { getCategoryItems } from "@/utilities/categories";

export function CategoriesSideBar() {
	const [ searchParams ] = useSearchParams();
	const { data: categories, isLoading, isError } = useGetCategories();
	const selectedCategoryId = searchParams.get("category");
	const isFeatured = searchParams.has("featured");

	if (isLoading) {
		return (
			<LoadingSpinnerContainer className="p-4 border-r border-input min-w-[var(--desktop-categories-width)]">
				<LoadingSpinner className="w-7 h-7" />
			</LoadingSpinnerContainer>
		);
	}

	return (
		<div className="overflow-y-auto border-r border-input p-2 pr-4 min-w-[var(--desktop-categories-width)]">
			{(!isError && categories) && (
				<ul className="space-y-2">
					{getCategoryItems(categories).map(category => {
						const isSelected = category.id === selectedCategoryId || (category.id === "featured" && isFeatured);
						return (
							<li key={category.id}>
								<Link to={category.path}>
									<Button
										className="justify-start px-2 whitespace-nowrap flex items-center gap-2"
										variant={isSelected ? "default" : "ghost"}>
										{category.id === "featured" && <Star className="w-4 h-4" />}
										{category.name}
									</Button>
								</Link>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
