import { Outlet } from "react-router-dom";
import { TopBar } from "@/components/navigation/TopBar";
import { MobileTopBar } from "@/components/navigation/MobileTopBar";
import { CategoriesSideBar } from "@/components/navigation/categories-sidebar/CategoriesSidebar";
import { MobileCategoriesRow } from "@/components/navigation/mobile-categories-row/MobileCategoriesRow";

type AppLayoutProps = {
    displayCategories: boolean;
};

export function AppLayout({ displayCategories }: AppLayoutProps) {
    console.log("APPLAYOUT")

    return (
        <div className="flex flex-col min-h-dvh">
            <div className="hidden md:flex">
                <TopBar />
            </div>
            <div className="flex md:hidden">
                <MobileTopBar />
            </div>
            {displayCategories && (
                <div className="flex md:hidden">
                    <MobileCategoriesRow />
                </div>
            )}
            <div className="flex flex-1">
                {displayCategories && (
                    <div className="hidden md:flex">
                        <CategoriesSideBar />
                    </div>
                )}
                <div className="flex-1 p-2">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
