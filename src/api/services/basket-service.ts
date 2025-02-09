import { api } from "../api-client.ts";

export interface BasketItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    totalPrice: number;
    quantity: number;
}

export class BasketService {
    public async getItemsInBasket(): Promise<BasketItem[]> {
        const response = await api.get("/me/basket");
        return response.data.basketDetails.items;
    }

    public async addToBasket(productId: string, quantity: number): Promise<void> {
        await api.post("/me/basket", { items: [{ productId, quantity }] });
    }

    public async updateQuantityInBasket(productId: string, quantity: number): Promise<void> {
        await api.post("/me/basket", { items: [{ productId, quantity }] });
    }

    public async deleteItemFromBasket(productId: string): Promise<BasketItem[]> {
        await api.post("/me/basket", { items: [{ productId, quantity: 0 }] });
        return this.getItemsInBasket();
    }

    public async clearBasket(): Promise<void> {
        await api.delete("/me/basket");
    }

    public async placeOrder(): Promise<string> {
        const response = await api.get("/me/checkout");
        return response.data.orderId;
    }
}