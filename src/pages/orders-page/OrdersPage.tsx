import { OrderCard } from "@/pages/orders-page/components/OrderCard";
import { useGetOrders } from "@/api/hooks/order-hooks";
import { ResultPage, ResultPageActions, ResultPageHeader, ResultPageMessage } from "@/pages/utility-pages/ResultPage";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPageContent } from "@/components/feature/UserPageContent";

export function OrdersPage() {
    const { data: orders } = useGetOrders();

    if (orders.length === 0) {
        return (
            <ResultPage variant="info">
                <ResultPageHeader>No previous orders</ResultPageHeader>
                <ResultPageMessage>You haven't placed any orders yet.</ResultPageMessage>
                <ResultPageActions>
                    <Link to="/"><Button className="w-full">Start Shopping</Button></Link>
                </ResultPageActions>
            </ResultPage>
        );
    }

    return (
        <UserPageContent title="Orders">
            {orders.map(order => (
                <OrderCard key={order.id} order={order} />
            ))}
        </UserPageContent>
    );
}
