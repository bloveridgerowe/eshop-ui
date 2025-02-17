import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { ProductCard } from "@/pages/browse-products-page/components/ProductCard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Paths } from "@/utilities/paths";
import { useGetProducts } from "@/api/hooks/product-hooks";
import { ErrorPage } from "@/pages/errors/error-page.tsx";
import { useAuth } from "@/hooks/use-auth.tsx";

export function BrowseProductsPage() {
    console.log("BrowseProductsPage Render");

    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams();
    const searchQuery = searchParams.get("search") || undefined;
    const categoryId = searchParams.get("category") || undefined;
    const { data: products, isPending, isError } = useGetProducts({ searchQuery, categoryId });
    const { user } = useAuth();

    useEffect(() => {
        const hasValidParams = searchQuery || categoryId || searchParams.has("featured");

        if (!hasValidParams) {
            navigate(Paths.featured(), { replace: true });
        }
    }, [searchQuery, categoryId, searchParams, navigate]);

    if (isPending) {
        return (
            <div className="flex justify-center min-h-[50vh]">
                <LoadingSpinner className="w-10 h-10 text-muted-foreground" />
            </div>
        );
    }

    if (isError) {
        return <ErrorPage title="Failed to load Products." message="Please try again later." />;
    }

    return (
        <div className="grid
            grid-cols-2
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            2xl:grid-cols-5
            3xl:grid-cols-6
            gap-4
            w-full
        ">
            {products?.map((product) => (
                <ProductCard key={product.id} product={product} loggedIn={!!user} />
            ))}
        </div>
    );
}
