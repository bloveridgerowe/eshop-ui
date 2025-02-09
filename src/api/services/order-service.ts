import { api } from "@/api/api-client.ts";

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
    createdAt: string,
    totalPrice: number;
    status: OrderStatus;
}

export enum OrderStatus {
    Pending = 0,
    Shipped = 1,
    Delivered = 2,
    Canceled = 3
}

export class OrderService {
    async getOrders(): Promise<OrderDetails[]> {
        const response = await api.get('/me/orders')
        return response.data.orders;
    }

    async placeOrder(): Promise<string> {
        const response = await api.post('/orders');
        return response.data.orderId;
    }
}