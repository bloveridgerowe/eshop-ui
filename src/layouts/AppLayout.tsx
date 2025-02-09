import { Outlet } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { MobileTopBar } from "@/components/MobileTopBar";
import { CategoriesSideBar } from "@/components/CategoriesSidebar";
import { MobileCategoriesRow } from "@/components/MobileCategoriesRow";

type AppLayoutProps = {
    displayCategories: boolean;
};

export function AppLayout({ displayCategories }: AppLayoutProps) {
    return (
        <div className="flex h-dvh flex-col">
            <div className="hidden md:flex w-full">
                <TopBar />
            </div>
            <div className="flex md:hidden w-full">
                <MobileTopBar />
            </div>
            {displayCategories && (
                <div className="flex md:hidden w-full">
                    <MobileCategoriesRow />
                </div>
            )}
            <div className="flex flex-1 md:overflow-hidden">
                {displayCategories && (
                    <div className="hidden md:flex">
                        <CategoriesSideBar />
                    </div>
                )}
                <div className="flex-1 overflow-y-auto p-2">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
