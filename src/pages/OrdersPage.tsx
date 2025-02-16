import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { OrderCard } from "@/components/OrderCard";
import { useGetOrders } from "@/api/hooks/order-hooks";
import { errorMessage } from "@/utilities/errors";

export function OrdersPage() {
    const { data: orders, isPending, error } = useGetOrders();
    const { errorToast } = useToast();

    if (error) {
        errorToast(errorMessage("Failed to load orders. Please try again later.", error));
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
