import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { BrowseProductsPage } from "@/pages/BrowseProductsPage";
import { ProductPage } from "@/pages/ProductPage";
import { AppLayout } from "@/layouts/AppLayout";
import { ProfilePage } from "@/pages/ProfilePage";
import { OrdersPage } from "@/pages/OrdersPage";
import { BasketPage } from "@/pages/BasketPage";
import { Paths } from "@/utilities/Paths";
import { OrderPlacedPage } from "@/pages/OrderPlacedPage";
import { useInitializeAuth } from "@/hooks/use-initialize-auth";

export function AppRoutes() {
    useInitializeAuth();

    return (
        <Routes>
            <Route path="/" element={<Navigate to={Paths.featured()} replace />} />
            <Route element={<AppLayout displayCategories={true} />}>
                <Route path={Paths.categories()} element={<BrowseProductsPage />} />
                <Route path={Paths.product()} element={<ProductPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout displayCategories={false} />}>
                    <Route path={Paths.profile()} element={<ProfilePage />} />
                    <Route path={Paths.orderPlaced()} element={<OrderPlacedPage />} />
                    <Route path={Paths.orders()} element={<OrdersPage />} />
                    <Route path={Paths.cart()} element={<BasketPage />} />
                </Route>
            </Route>
        </Routes>
    );
}

