import { Outlet } from "react-router-dom";
import { CategoriesSideBar } from "@/components/navigation/categories-sidebar/CategoriesSidebar";

export function ProductsLayout() {
    console.log("Rendering AppLayout");
    return (
        <div className="flex-1 flex flex-col md:flex-row items-stretch">
            <CategoriesSideBar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}

ProductsLayout.whyDidYouRender = true;
