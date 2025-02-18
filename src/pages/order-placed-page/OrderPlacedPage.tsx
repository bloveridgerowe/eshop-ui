import { useLocation, Link } from "react-router-dom";
import { ResultPage, ResultPageActions, ResultPageHeader, ResultPageMessage } from "../result-pages/ResultPage";
import { Button } from "@/components/shadcn/button";

export function OrderPlacedPage() {
    const location = useLocation();
    const orderId = location.state?.orderId;

    return (
        <ResultPage variant="success">
            <ResultPageHeader>Thank you for your order!</ResultPageHeader>
            <ResultPageMessage>We’ll send you a confirmation email shortly.</ResultPageMessage>
            {orderId &&
                <ResultPageMessage>
                    Your order ID is: <span className="font-medium">{orderId}</span>
                </ResultPageMessage>}
            <ResultPageActions>
                <Link to="/">
                    <Button className="w-full">Continue Shopping</Button>
                </Link>
            </ResultPageActions>
        </ResultPage>
    );
}
