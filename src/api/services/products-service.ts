import { api } from "@/api/api-client";

export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    imageUrl: string;
    description?: string;
}

interface GetProductsParams {
    searchQuery?: string;
    categoryId?: string;
    isFeatured?: boolean;
}

export async function getProduct({ id }: { id: string }): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    return response.data.productDetails;
}

export async function getProducts({ searchQuery, categoryId, isFeatured = true }: GetProductsParams): Promise<Product[]> {
    const params = new URLSearchParams();

    if (searchQuery) {
        params.append("search", searchQuery);
    }
    else if (categoryId) {
        params.append("category", categoryId);
    }
    else if (isFeatured) {
        params.append("featured", "true");
    }

    const response = await api.get(`/products?${params.toString()}`);
    return response.data.products;
}
