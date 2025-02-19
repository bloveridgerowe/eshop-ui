import { Suspense } from "react";
import { CategoriesSideBarList } from "./CategoriesSidebarList";
import { CategoriesSideBarListSkeleton } from "@/components/navigation/categories-sidebar/CategoriesSidebarListSkeleton.tsx";

export function CategoriesSideBar() {
	return (
		<div className="overflow-y-auto border-r border-input p-2 pr-4 min-w-[var(--desktop-categories-width)]">
			<Suspense fallback={<CategoriesSideBarListSkeleton />}>
				<CategoriesSideBarList />
			</Suspense>
		</div>
	);
}
