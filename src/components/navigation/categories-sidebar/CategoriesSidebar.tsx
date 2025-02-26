import { Suspense } from "react";
import { CategoriesSideBarList, CategoriesSideBarListSkeleton } from "@/components/navigation/categories-sidebar/CategoriesSidebarList";

export function CategoriesSideBar() {
	return (
		<>
			<Suspense fallback={<CategoriesSideBarListSkeleton />}>
				<CategoriesSideBarList />
			</Suspense>
		</>
	);
}
