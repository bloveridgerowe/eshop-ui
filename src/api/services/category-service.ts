import { api } from "@/api/api-client";

export interface Category {
    id: string;
    name: string;
}

export async function getCategories(): Promise<Category[]> {
    const response = await api.get("/categories");
    return response.data.categories;
}
