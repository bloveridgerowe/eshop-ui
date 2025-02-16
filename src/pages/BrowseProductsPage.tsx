import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useToast } from "@/components/ui/use-toast";
import { Paths } from "@/utilities/paths";
import { useGetProducts } from "@/api/hooks/product-hooks";
import { errorMessage } from "@/utilities/errors";

export function BrowseProductsPage() {
    const [ searchParams ] = useSearchParams();
    const { errorToast } = useToast();
    const navigate = useNavigate();
    const searchQuery = searchParams.get("search") || undefined;
    const categoryId = searchParams.get("category") || undefined;

    useEffect(() => {
        if (!searchQuery && !categoryId) {
            navigate(Paths.featured(), { replace: true });
        }
    }, [searchQuery, categoryId, navigate]);

    const { data: products, isPending, error } = useGetProducts({ searchQuery, categoryId });

    if (error) {
        errorToast(errorMessage("Failed to load products. Please try again later.", error));
        return null;
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
