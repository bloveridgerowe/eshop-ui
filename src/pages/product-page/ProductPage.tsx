import { Link, useParams } from "react-router-dom";
import { Paths } from "@/utilities/paths";
import { ProductDetailsCard } from "@/pages/product-page/components/ProductDetailsCard";
import { ResultPage, ResultPageActions, ResultPageHeader, ResultPageMessage } from "@/pages/utility-pages/ResultPage";
import { Button } from "@/components/ui/button";
import { useGetProduct } from "@/api/hooks/product-hooks";

export function ProductPage() {
    const { id } = useParams();
    const { data: product } = useGetProduct(id!);

    if (!product) {
        return (
            <ResultPage variant="error">
                <ResultPageHeader>Product not found.</ResultPageHeader>
                <ResultPageMessage>We couldn’t find the product you’re looking for.</ResultPageMessage>
                <ResultPageActions>
                    <Link to={Paths.products()}>
                        <Button className="w-full">Continue Shopping</Button>
                    </Link>
                </ResultPageActions>
            </ResultPage>
        );
    }

    return (
        <div className="flex items-center justify-center p-2">
            <ProductDetailsCard product={product} />
        </div>
    );
}
