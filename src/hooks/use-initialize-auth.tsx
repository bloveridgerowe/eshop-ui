import { useDispatch } from "react-redux";
import { useServices } from "@/hooks/use-services";
import { useEffect } from "react";
import { loginSuccess, logout, setLoading } from "@/state/auth-slice.ts";

export function useInitializeAuth() {
    const { customerService } = useServices();
    const dispatch = useDispatch();

    useEffect(() => {
        const verifySession = async () => {
            dispatch(setLoading());

            try {
                const response = await customerService.getCustomerDetails();
                dispatch(loginSuccess(response.email));
            } catch {
                dispatch(logout());
            }
        };

        verifySession();
    }, [ dispatch, customerService ]);

    return null;
}