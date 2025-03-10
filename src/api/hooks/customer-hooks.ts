import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCardDetails, updateAddressDetails, updateName, changePassword, logout, login, register, demoLogin } from "@/api/services/customer-service";
import { queryKeys } from "@/api/hooks/query-keys";

export function useUpdateName() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateName,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.customer }),
    });
}

export function useUpdateAddress() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateAddressDetails,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.customer }),
    });
}

export function useUpdateCardDetails() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateCardDetails,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.customer }),
    });
}

export function useChangePassword() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: changePassword,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.customer }),
    });
}

export function useRegister() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            await register({ email, password });
            await login({ email, password });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: queryKeys.customer });
            await queryClient.invalidateQueries({ queryKey: queryKeys.basket });
            await queryClient.invalidateQueries({ queryKey: queryKeys.orders });
        },
    });
}

export function useLogin() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: login,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: queryKeys.customer });
            await queryClient.invalidateQueries({ queryKey: queryKeys.basket });
            await queryClient.invalidateQueries({ queryKey: queryKeys.orders });
        }
    });
}

export function useLogout() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: logout,
        onSuccess: async () => {
            await queryClient.setQueryData(queryKeys.customer, null);
            await queryClient.invalidateQueries({ queryKey: queryKeys.basket });
            await queryClient.invalidateQueries({ queryKey: queryKeys.orders });
        },
    });
}

export function useDemoLogin() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: demoLogin,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: queryKeys.customer });
            await queryClient.invalidateQueries({ queryKey: queryKeys.basket });
            await queryClient.invalidateQueries({ queryKey: queryKeys.orders });
        }
    });
}
