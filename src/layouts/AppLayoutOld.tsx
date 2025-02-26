import { Outlet } from "react-router-dom";
import { TopBar } from "@/components/navigation/top-bar/TopBar";
import { CategoriesSideBar } from "@/components/navigation/categories-sidebar/CategoriesSidebar";

type AppLayoutProps = {
    displayCategories: boolean;
};

export function AppLayout({ displayCategories }: AppLayoutProps) {
    console.log("Rendering AppLayout");
    return (
        <div className="flex flex-col min-h-dvh">
            <div className="hidden md:flex">
                <TopBar />
            </div>
            <div className="flex flex-1">
                <div className="hidden md:flex">
                    <CategoriesSideBar />
                </div>
                <div className="flex-1 p-2">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

AppLayout.whyDidYouRender = true;
