import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/routes/ProtectedRoute.tsx";
import { BrowseProductsPage } from "@/pages/browse-products-page/BrowseProductsPage.tsx";
import { ProductPage } from "@/pages/product-page/ProductPage.tsx";
import { ProfilePage } from "@/pages/profile-page/ProfilePage.tsx";
import { OrdersPage } from "@/pages/orders-page/OrdersPage.tsx";
import { BasketPage } from "@/pages/basket-page/BasketPage.tsx";
import { Paths } from "@/utilities/paths.ts";
import { OrderPlacedPage } from "@/pages/order-placed-page/OrderPlacedPage.tsx";
import { LoadingSpinnerPage } from "@/pages/utility-pages/LoadingSpinnerPage.tsx";
import { Suspense } from "react";
import { UserLayout } from "@/layouts/UserLayout.tsx";
import { AppLayout } from "@/layouts/AppLayout.tsx";

export function AppRoutes() {
    return (
        <Suspense fallback={<LoadingSpinnerPage delay={1000}/>}>
            <Routes>
                <Route path="/" element={<AppLayout/>}>
                    <Route index element={<Navigate to={Paths.featured()} replace />} />
                    <Route path={Paths.categories()} element={<BrowseProductsPage />} />
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

