import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { OrderCard } from "@/pages/orders-page/components/OrderCard";
import { useGetOrders } from "@/api/hooks/order-hooks";
import {ErrorPage} from "@/pages/errors/error-page.tsx";

export function OrdersPage() {
    const { data: orders, isPending, isError } = useGetOrders();

    if (isPending) {
        return (
            <div className="flex justify-center min-h-[50vh]">
                <LoadingSpinner className="w-10 h-10 text-muted-foreground" />
            </div>
        );
    }

    if (isError) {
        return <ErrorPage title="Failed to load Orders." message="Please try again later."/>;
    }

    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-[500px]">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Orders</h1>
                </div>
                {orders.length > 0 ? (
                    orders.map((order) => <OrderCard key={order.id} order={order} />)
                ) : (
                    <p className="text-center text-muted-foreground mt-6">No previous orders.</p>
                )}
            </div>
        </div>
    );
}
