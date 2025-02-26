import { Outlet } from "react-router-dom";
import {ProductsFilters} from "@/components/feature/ProductsFilters.tsx";

export function ProductsLayout() {
    return (
        <div className="flex-1 flex flex-col md:flex-row items-stretch">
            <ProductsFilters/>
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
}

ProductsLayout.whyDidYouRender = true;
