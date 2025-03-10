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

export interface ProductFilters {
    search?: string;
    category?: string;
    featured?: boolean;
    priceRange?: PriceRange;
}

export interface PriceRange {
    max: number,
    min: number,
}

export async function getProduct({ id }: { id: string }): Promise<Product|null> {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data.productDetails;
    }
    catch {
        return null;
    }
}

export interface GetProductsResponse {
    priceRange: PriceRange,
    products: Product[]
}

export async function getProducts({ search, category, featured = true, priceRange }: ProductFilters): Promise<GetProductsResponse> {
    const params = new URLSearchParams();

    if (search) {
        params.append("search", search);
    }
    else if (category) {
        params.append("category", category);
    }
    else if (featured) {
        params.append("featured", "true");
    }

    if (priceRange && priceRange.max > 0) {
        params.append("minPrice", priceRange.min.toString());
        params.append("maxPrice", priceRange.max.toString());
    }

    const response = await api.get(`/products?${params.toString()}`);
    return response.data;
}
