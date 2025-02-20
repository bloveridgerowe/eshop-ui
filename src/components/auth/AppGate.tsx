import { useAuth } from "@/hooks/use-auth";
import { ReactNode } from "react";
import { AppUnavailable } from "@/pages/error-pages/AppUnavailable";
import { ConditionalDisplay } from "@/components/utilities/ConditionalDisplay";
import { useGetCategories } from "@/api/hooks/category-hooks.ts";
import { useGetProducts } from "@/api/hooks/product-hooks.ts";

export interface AppGateProps {
    children: ReactNode;
}

export function AppGate({ children }: AppGateProps) {
    const { isLoading: isAuthLoading, isError: isAuthError, status: authStatus } = useAuth();
    const { isLoading: isCategoriesLoading, isError: isCategoriesError, status: categoriesStatus } = useGetCategories();
    const { isLoading: isProductsLoading, isError: isProductsError, status: ProductsStatus } = useGetProducts({});

    console.group("AppGate State");
    console.log({ hook: "useAuth", isAuthLoading, authStatus });
    console.log({ hook: "useGetCategories", isCategoriesLoading, isCategoriesError, categoriesStatus });
    console.log({ hook: "useGetProducts", isProductsLoading, isProductsError, ProductsStatus });
    console.groupEnd();

    if (isAuthError || isCategoriesError || isProductsError) {
        return (
            <AppUnavailable/>
        );
    }

    return (
        <ConditionalDisplay visible={!isAuthLoading} content={children}/>
    );
}
