import { ApiError } from "@/api/api-client";

export function errorMessage(defaultMessage: string, error?: unknown): string {
    const messageFromApi = (error as ApiError)?.message;
    return messageFromApi ?? defaultMessage;
}
