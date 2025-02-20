import { useAuth } from "@/hooks/use-auth";
import { ReactNode } from "react";
import { AppUnavailable } from "@/pages/error-pages/AppUnavailable";
import { ConditionalDisplay } from "@/components/utilities/ConditionalDisplay";

export interface AppGateProps {
    children: ReactNode;
}

export function AppGate({ children }: AppGateProps) {
    const { isLoading: isAuthLoading, isError: isAuthError, status: authStatus } = useAuth();

    console.log({ hook: "useAuth", isAuthLoading, authStatus });


    if (isAuthError ) {
        return (
            <AppUnavailable/>
        );
    }

    return (
        <ConditionalDisplay visible={!isAuthLoading} content={children}/>
    );
}
