import { api } from "@/api/api-client";

export interface BasketItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    totalPrice: number;
    quantity: number;
}

export async function getItemsInBasket(): Promise<BasketItem[]> {
    const response = await api.get("/me/basket");
    return response.data.basketDetails.items;
}

export async function addToBasket({ productId, quantity }: { productId: string; quantity: number }): Promise<void> {
    await api.patch("/me/basket", { items: [{ productId, quantity }] });
}

export async function updateQuantityInBasket({ productId, quantity }: { productId: string; quantity: number }): Promise<void> {
    await api.patch("/me/basket", { items: [{ productId, quantity }] });
}

export async function deleteItemFromBasket({ productId }: { productId: string }): Promise<BasketItem[]> {
    await api.patch("/me/basket", { items: [{ productId, quantity: 0 }] });
    return getItemsInBasket();
}

export async function clearBasket(): Promise<void> {
    await api.delete("/me/basket");
}
