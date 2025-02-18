import { useAuth } from "@/hooks/use-auth";
import { ReactNode } from "react";
import { AppUnavailable } from "@/pages/error-pages/AppUnavailable";
import { ConditionalDisplay } from "@/components/utilities/ConditionalDisplay.tsx";

export interface AuthResolverProps {
    children: ReactNode;
}

export function AppGate({ children }: AuthResolverProps) {
    const { isLoading, isError, status } = useAuth();

    console.log({ component: "AppGate", isLoading, isError, status });

    if (isError) {
        return (
            <AppUnavailable/>
        );
    }

    return (
        <ConditionalDisplay visible={!isLoading} content={children}/>
    );
}
