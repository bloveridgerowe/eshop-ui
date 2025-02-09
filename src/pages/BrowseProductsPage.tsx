import { useNavigate, useSearchParams } from "react-router-dom";
import { useServices } from "@/hooks/use-services";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { errorToast } from "@/hooks/use-toast";
import { Paths } from "@/utilities/Paths";
import { useEffect } from "react";

export function BrowseProductsPage() {
    const { productsService } = useServices();
    const [ searchParams ] = useSearchParams();

    const navigate = useNavigate();
    const searchQuery = searchParams.get("search");
    const category = searchParams.get("category");

    useEffect(() => {
        if (!searchQuery && !category) {
            navigate(Paths.featured(), { replace: true });
        }
    }, [ searchQuery, category, navigate ]);

    const { data: products, isPending, error } = useQuery({
        queryKey: ["products", searchQuery, category],
        queryFn: () =>
            searchQuery
                ? productsService.searchProducts(searchQuery)
                : category
                    ? productsService.getProductsByCategory(category)
                    : productsService.getFeaturedProducts()
    });

    if (error) {
        errorToast("Failed to load products. Please try again later.");
        return;
    }

    if (isPending) {
        return (
            <div className="flex justify-center min-h-[50vh]">
                <LoadingSpinner className="w-10 h-10 text-muted-foreground" />
            </div>
        );
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
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}