import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api/hooks/query-keys";
import { getCustomerDetails } from "@/api/services/customer-service";
import { ApiError } from "@/api/api-client.ts";

export function useAuth() {
    const { data: user, isLoading, isError, status } = useQuery({
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
        staleTime: 60 * 1000,
        gcTime: 60 * 1000,
        retry: false,
    });

    return { user, isLoading, isError, status };
}
