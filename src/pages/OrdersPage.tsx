import { useServices } from "@/hooks/use-services";
import { useQuery } from "@tanstack/react-query";
import { errorToast } from "@/hooks/use-toast.ts";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { OrderCard } from "@/pages/OrderCard";

export function OrdersPage() {
    const { orderService } = useServices();

    const { data: orders, isPending, error } = useQuery({
        queryKey: ["orders"],
        queryFn: () => orderService.getOrders()
    });

    if (error) {
        errorToast("Failed to load products. Please try again later.");
        return;
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
                {orders.length > 0 ? (orders.map((order) => (
                    <OrderCard order={order} />
                ))) : (
                    <p className="text-center text-muted-foreground mt-6">No previous orders.</p>
                )}
            </div>
        </div>
    );
}




