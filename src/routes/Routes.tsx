import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { BrowseProductsPage } from "@/pages/browse-products-page/BrowseProductsPage";
import { ProductPage } from "@/pages/product-page/ProductPage";
import { ProfilePage } from "@/pages/profile-page/ProfilePage";
import { OrdersPage } from "@/pages/orders-page/OrdersPage";
import { BasketPage } from "@/pages/basket-page/BasketPage";
import { Paths } from "@/utilities/paths";
import { OrderPlacedPage } from "@/pages/order-placed-page/OrderPlacedPage";
import { LoadingSpinnerPage } from "@/pages/utility-pages/LoadingSpinnerPage";
import { Suspense } from "react";
import { UserLayout } from "@/layouts/UserLayout";
import { AppLayout } from "@/layouts/AppLayout";

export function AppRoutes() {
    return (
        <Suspense fallback={<LoadingSpinnerPage delay={1000}/>}>
            <Routes>
                <Route path="/" element={<AppLayout/>}>
                    <Route index element={<Navigate to={Paths.products()} replace />} />
                    <Route path={Paths.products()} element={<BrowseProductsPage />} />
                    <Route path={Paths.product()} element={<ProductPage />} />
                    <Route element={<ProtectedRoute/>}>
                        <Route element={<UserLayout/>}>
                            <Route path={Paths.profile()} element={<ProfilePage />} />
                            <Route path={Paths.orderPlaced()} element={<OrderPlacedPage />} />
                            <Route path={Paths.orders()} element={<OrdersPage />} />
                            <Route path={Paths.basket()} element={<BasketPage />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    );
}

