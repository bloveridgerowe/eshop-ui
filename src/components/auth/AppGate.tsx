import { useAuth } from "@/hooks/use-auth";
import { ReactNode } from "react";
import { AppUnavailable } from "@/pages/error-pages/AppUnavailable";
import { ConditionalDisplay } from "@/components/utilities/ConditionalDisplay.tsx";

export interface AppGateProps {
    children: ReactNode;
}

export function AppGate({ children }: AppGateProps) {
    const { user, isLoading, isError, status } = useAuth();

    console.log({ component: "AppGate", user, isLoading, isError, status });

    if (isError) {
        return (
            <AppUnavailable/>
        );
    }

    return (
        <ConditionalDisplay visible={!isLoading} content={children}/>
    );
}
