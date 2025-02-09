import { useQuery } from "@tanstack/react-query";
import { useServices } from "@/hooks/use-services";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Paths } from "@/utilities/Paths";
import { errorToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Star } from "lucide-react";

export function CategoriesSideBar() {
	const { categoryService } = useServices();
	const [ searchParams ] = useSearchParams();

	const selectedCategoryId = searchParams.get("category");
	const isFeatured = searchParams.has("featured");

	const { data: categories, isLoading, isError } = useQuery({
		queryKey: ["categories"],
		queryFn: async () => categoryService.getCategories()
	});

	if (isLoading) {
		return (
			<div className="justify-center p-4 border-r border-input">
				<LoadingSpinner className="w-7 h-7 text-muted-foreground" />
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
		<div className="overflow-y-auto border-r border-input p-2 pr-4">
			<ul className="space-y-2">
				{allCategorySidebarItems.map((category) => {
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
		</div>
	);
}