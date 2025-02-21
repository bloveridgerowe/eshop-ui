import { useNavigate, useSearchParams } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { Paths } from "@/utilities/paths";
import { BrowseProducts, BrowseProductsSkeleton } from "@/pages/browse-products-page/components/BrowseProducts";

export function BrowseProductsPage() {
    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams();
    const searchQuery = searchParams.get("search") || undefined;
    const categoryId = searchParams.get("category") || undefined;

    useEffect(() => {
        const hasValidParams = searchQuery || categoryId || searchParams.has("featured");

        if (!hasValidParams) {
            navigate(Paths.featured(), { replace: true });
        }
    }, [searchQuery, categoryId, searchParams, navigate]);

    return (
        <Suspense fallback={<BrowseProductsSkeleton />}>
            <BrowseProducts/>
        </Suspense>
    );
}


