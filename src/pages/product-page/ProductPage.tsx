import { useNavigate, useParams } from "react-router-dom";
import { Paths } from "@/utilities/paths";
import { ProductCard } from "@/pages/product-page/components/Product.tsx";

export function ProductPage() {
    const { id } = useParams();
    const navigate  = useNavigate();

    if (!id) {
        navigate(Paths.featured(), { replace: true });
        return;
    }

    return (
        <div className="flex items-center justify-center">
            <ProductCard id={id} />
        </div>
    );
}
