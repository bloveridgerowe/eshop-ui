import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "@/api/hooks/query-keys";
import { getCustomerDetails } from "@/api/services/customer-service";

export function useAuth() {
    const { data: user, isLoading, isError, status } = useQuery({
        queryKey: queryKeys.customer,
        queryFn: async () => {
            try {
                return await getCustomerDetails();
            }
            catch (error) {
                if (error instanceof AxiosError && error.response?.status === 401) {
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
