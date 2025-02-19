import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/routes/ProtectedRoute";
import { BrowseProductsPage } from "@/pages/browse-products-page/BrowseProductsPage";
import { ProductPage } from "@/pages/product-page/ProductPage";
import { AppLayout } from "@/layouts/AppLayout";
import { ProfilePage } from "@/pages/profile-page/ProfilePage";
import { OrdersPage } from "@/pages/orders-page/OrdersPage";
import { BasketPage } from "@/pages/basket-page/BasketPage";
import { Paths } from "@/utilities/paths";
import { OrderPlacedPage } from "@/pages/order-placed-page/OrderPlacedPage";

export function AppRoutes() {
    console.log("APP ROUTES")
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
                    <Route path={Paths.basket()} element={<BasketPage />} />
                </Route>
            </Route>
        </Routes>
    );
}

