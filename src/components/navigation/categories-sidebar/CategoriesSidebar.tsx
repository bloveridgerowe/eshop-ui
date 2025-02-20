import { Suspense } from "react";
import { CategoriesSideBarList, CategoriesSideBarListSkeleton } from "@/components/navigation/categories-sidebar/CategoriesSidebarList";

export function CategoriesSideBar() {
	return (
		<div className="overflow-y-auto border-r border-input p-2 min-w-[var(--desktop-categories-width)]">
			<Suspense fallback={<CategoriesSideBarListSkeleton />}>
				<CategoriesSideBarList />
			</Suspense>
		</div>
	);
}
