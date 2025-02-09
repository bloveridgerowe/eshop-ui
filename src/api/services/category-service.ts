import { api } from "../api-client.ts";

export interface Category {
    id: string;
    name: string;
}

export class CategoryService {
    public async getCategories(): Promise<Category[]> {
        const response = await api.get("/categories");
        return response.data.categories;
    }
}
