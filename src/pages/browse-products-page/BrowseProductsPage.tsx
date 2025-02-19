import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { ProductCard } from "@/pages/browse-products-page/components/ProductCard";
import { LoadingSpinner, LoadingSpinnerContainer } from "@/components/ui/LoadingSpinner";
import { Paths } from "@/utilities/paths";
import { useGetProducts } from "@/api/hooks/product-hooks";
import { ResultPage, ResultPageHeader, ResultPageMessage } from "@/pages/result-page/ResultPage";
import { useAuth } from "@/hooks/use-auth";

export function BrowseProductsPage() {
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
            <LoadingSpinnerContainer>
                <LoadingSpinner/>
            </LoadingSpinnerContainer>
        );
    }

    if (isError) {
        return (
            <ResultPage variant="error">
                <ResultPageHeader>Failed to load products.</ResultPageHeader>
                <ResultPageMessage>Please try again later.</ResultPageMessage>
            </ResultPage>
        );
    }

    if (!products || products.length === 0) {
        return (
            <ResultPage variant="info">
                <ResultPageHeader>No products found.</ResultPageHeader>
                <ResultPageMessage>Try adjusting your search or browsing other categories.</ResultPageMessage>
            </ResultPage>
        );
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 w-full">
            {products.map(product => (
                <ProductCard key={product.id} product={product} loggedIn={!!user} />
            ))}
        </div>
    );
}
