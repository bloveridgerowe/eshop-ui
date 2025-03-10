import { api } from "@/api/api-client";

export interface OrderItemDetails {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    totalPrice: number;
}

export interface OrderDetails {
    id: string;
    customerId: string;
    items: OrderItemDetails[];
    createdAt: string;
    totalPrice: number;
    status: OrderStatus;
}

export interface OrderStatus {
    id: string;
    name: string;
}

export async function getOrders(): Promise<OrderDetails[]> {
    const response = await api.get('/me/orders');
    return response.data.orders;
}

export async function placeOrder(): Promise<string> {
    const response = await api.post('/me/checkout');
    return response.data.orderId;
}
