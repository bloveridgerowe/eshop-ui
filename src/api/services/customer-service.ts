import { api } from "@/api/api-client.ts";

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
    address?: CustomerAddress,
    cardDetails?: CardDetails,
}

export class CustomerService {
    async logout(): Promise<void> {
        await api.post("/auth/logout");
    }

    async login(email: string, password: string): Promise<void> {
        await api.post("/auth/login", { email, password });
    }

    async register(email: string, password: string): Promise<void> {
        await api.post("/auth/register", { email, password });
    }

    async changePassword(oldPassword: string, newPassword: string): Promise<void> {
        await api.post("/auth/change-password", { oldPassword, newPassword });
    }

    async getCustomerDetails(): Promise<CustomerDetails> {
        const response = await api.get('/me');
        return response.data.customerDetails;
    }

    async updateCardDetails(cardDetails: CardDetails) : Promise<void> {
        await api.post('/me', { cardDetails });
    }

    async updateAddressDetails(address: CustomerAddress) : Promise<void> {
        await api.post('/me', { address });
    }

    async updateName(name: string) : Promise<void> {
        await api.post('/me', { name });
    }
}
