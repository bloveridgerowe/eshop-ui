import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/routes/ProtectedRoute";
import { BrowseProductsPage } from "@/pages/browse-products-page/BrowseProductsPage";
import { ProductPage } from "@/pages/product-page/ProductPage";
import { ProductsLayout } from "@/layouts/ProductsLayout.tsx";
import { ProfilePage } from "@/pages/profile-page/ProfilePage";
import { OrdersPage } from "@/pages/orders-page/OrdersPage";
import { BasketPage } from "@/pages/basket-page/BasketPage";
import { Paths } from "@/utilities/paths";
import { OrderPlacedPage } from "@/pages/order-placed-page/OrderPlacedPage";
import { CenteredSpinner } from "@/pages/utility-pages/CenteredSpinner";
import { Suspense } from "react";
import { UserLayout } from "@/layouts/UserLayout.tsx";
import { AppLayout } from "@/layouts/AppLayout.tsx";

export function AppRoutes() {
    return (
        <Suspense fallback={<CenteredSpinner delay={1000}/>}>
            <Routes>
                <Route path="/" element={<AppLayout/>}>
                    <Route index element={<Navigate to={Paths.featured()} replace />} />
                    <Route element={<ProductsLayout/>}>
                        <Route path={Paths.categories()} element={<BrowseProductsPage />} />
                        <Route path={Paths.product()} element={<ProductPage />} />
                    </Route>
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

