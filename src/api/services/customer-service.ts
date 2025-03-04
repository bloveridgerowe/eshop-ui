import { api } from "@/api/api-client";

export interface CustomerAddress {
    firstLine: string;
    secondLine: string;
    city: string;
    county: string;
    postCode: string;
}

export interface CardDetails {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

export interface CustomerDetails {
    name?: string;
    email: string;
    address?: CustomerAddress;
    cardDetails?: CardDetails;
}

export async function logout(): Promise<void> {
    await api.post("/auth/logout");
}

export async function demoLogin(): Promise<void> {
    await api.post("/auth/login/demo");
}

export async function login({ email, password }: { email: string; password: string }): Promise<void> {
    await api.post("/auth/login", { email, password });
}

export async function register({ email, password }: { email: string; password: string }): Promise<void> {
    await api.post("/auth/register", { email, password });
}

export async function changePassword({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }): Promise<void> {
    await api.post("/auth/change-password", { oldPassword: currentPassword, newPassword });
}

export async function getCustomerDetails(): Promise<CustomerDetails> {
    const response = await api.get('/me');
    return response.data.customerDetails;
}

export async function updateCardDetails({ cardDetails }: { cardDetails: CardDetails }): Promise<void> {
    await api.post('/me', { cardDetails });
}

export async function updateAddressDetails({ address }: { address: CustomerAddress }): Promise<void> {
    await api.post('/me', { address });
}

export async function updateName({ name }: { name: string }): Promise<void> {
    await api.post('/me', { name });
}
