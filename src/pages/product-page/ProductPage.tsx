import { useNavigate, useParams } from "react-router-dom";
import { Paths } from "@/utilities/paths";
import { ProductDetailsCard } from "@/pages/product-page/components/ProductDetailsCard.tsx";

export function ProductPage() {
    const { id } = useParams();
    const navigate  = useNavigate();

    if (!id) {
        navigate(Paths.products(), { replace: true });
        return;
    }

    return (
        <div className="flex items-center justify-center p-2">
            <ProductDetailsCard id={id} />
        </div>
    );
}
