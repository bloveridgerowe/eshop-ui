import { OrderDetails, OrderStatus } from "@/api/services/order-service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export interface OrderCardProps {
    order: OrderDetails
}

export function OrderCard({ order }: OrderCardProps) {
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
                            {order.status.name}
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

function getStatusColor(status: OrderStatus): string {
    switch (status.name.toUpperCase()) {
        case 'PENDING':
            return 'text-yellow-500';
        case 'SHIPPED':
            return 'text-blue-500';
        case 'DELIVERED':
            return 'text-green-500';
        case 'CANCELED':
            return 'text-red-500';
        default:
            return 'text-gray-500';
    }
}

function formatDate(dateString: string) {
    return format(new Date(dateString), "MMM d, yyyy HH:mm");
}
