import { api } from "../api-client.ts";

export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    imageUrl: string;
}

export class ProductsService {
    public async getProductsByCategory(categoryId: string): Promise<Product[]> {
        const response = await api.get(`/products?category=${categoryId}`);
        return response.data.products;
    }

    public async searchProducts(partialName: string): Promise<Product[]> {
        const response = await api.get(`/products?search=${partialName}`);
        return response.data.products;
    }

    public async getFeaturedProducts(): Promise<Product[]> {
        const response = await api.get(`/products?featured=true`);
        return response.data.products;
    }
}
