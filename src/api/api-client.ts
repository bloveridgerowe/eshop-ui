import axios, { AxiosError } from "axios";
import { queryClient } from "@/api/query-client";
import { queryKeys } from "@/api/hooks/query-keys";

let isRefreshing = false;

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
});

api.interceptors.response.use(response => response, async error => {
    if (error.response?.status === 401) {
        if (!isRefreshing) {
            try {
                isRefreshing = true;
                await api.post("/token/refresh");
                isRefreshing = false;
                return api(error.config);
            }
            catch {
                isRefreshing = false;
                await queryClient.setQueryData(queryKeys.customer, null);
            }
        }
    }

    return Promise.reject(normalizeApiError(error));
});

export class ApiError {
    constructor(public status: number, public message?: string) {}
}

function normalizeApiError(error: unknown): ApiError {
    if (error instanceof AxiosError) {
        return new ApiError(error.response?.status ?? 0, error.response?.data?.detail);
    }

    return new ApiError(0);
}
