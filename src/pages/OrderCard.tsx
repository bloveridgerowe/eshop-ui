import { OrderDetails, OrderStatus } from "@/api/services/order-service.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

function formatDate(dateString: string) {
    console.log(dateString);
    return format(new Date(dateString), "MMM d, yyyy HH:mm");
}

function getStatusText(status: OrderStatus): string {
    return OrderStatus[status];
}

function getStatusColor(status: OrderStatus): string {
    switch (status) {
        case OrderStatus.Pending:
            return 'text-yellow-500';
        case OrderStatus.Shipped:
            return 'text-blue-500';
        case OrderStatus.Delivered:
            return 'text-green-500';
        case OrderStatus.Canceled:
            return 'text-red-500';
        default:
            return 'text-gray-500';
    }
}

export function OrderCard({order}: { order: OrderDetails }) {
    return (
        <Card key={order.id} className="mb-4">
            <CardHeader>
                <div className="flex justify-between items-start w-full">
                    <div>
                        <CardTitle className="font-semibold">
                            Order #{order.id.substring(0, 8).toUpperCase()}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            {formatDate(order.createdAt)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {order.items.length} {order.items.length === 1 ? "item" : "items"}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold mt-1">
                            £{order.totalPrice.toFixed(2)}
                        </p>
                        <span className={`font-medium ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {order.items.map((item) => (
                    <div key={item.productId} className="flex justify-between items-center text-sm">
                        <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-muted-foreground">
                                {item.quantity} × £{item.price.toFixed(2)}
                            </p>
                        </div>
                        <p className="font-medium">£{item.totalPrice.toFixed(2)}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}