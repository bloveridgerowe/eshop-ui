import { ResultPage, ResultPageHeader, ResultPageMessage } from "@/pages/utility-pages/ResultPage";
import { ProductGrid } from "@/pages/browse-products-page/components/ProductGrid";
import { Product } from "@/api/services/products-service";

interface ProductsBrowserProps {
    products?: Product[]
    showSkeleton: boolean;
}

export function ProductsBrowser({ products = [], showSkeleton }: ProductsBrowserProps) {
    if (showSkeleton) {
        return (
            <ProductGrid showSkeleton/>
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
        <ProductGrid products={products}/>
    );
}
