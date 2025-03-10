import { createContext, useContext, ReactNode } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api/hooks/query-keys";
import { CustomerDetails, getCustomerDetails } from "@/api/services/customer-service";
import { ApiError } from "@/api/api-client";

interface AuthContextType {
    user: CustomerDetails | undefined | null;
    isLoading: boolean;
    isError: boolean;
    status: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { data: user, isLoading, isError, status } = useSuspenseQuery({
        queryKey: queryKeys.customer,
        queryFn: async () => {
            try {
                return await getCustomerDetails();
            }
            catch (error) {
                if (error instanceof ApiError && error.status === 401) {
                    return null;
                }
                throw error;
            }
        },
        retry: false,
        staleTime: 60 * 1000,
        gcTime: 60 * 1000,
    });
    
    return (
        <AuthContext.Provider value={{ user, isLoading, isError, status }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}

AuthProvider.whyDidYouRender = true;
