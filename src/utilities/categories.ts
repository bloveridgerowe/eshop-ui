import { Category } from "@/api/services/category-service";
import { Paths } from "@/utilities/paths";

export function getCategoryItems(categories?: Category[]) {
    const featuredCategorySidebarItem = {
        id: "featured",
        name: "Featured",
        path: Paths.featured()
    };

    const categoriesSidebarItems = (categories ?? []).map(category => ({
        ...category,
        path: Paths.categories(category.id)
    }));

    return [ featuredCategorySidebarItem, ...categoriesSidebarItems ];
}
