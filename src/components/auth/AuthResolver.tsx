import { useAuth } from "@/hooks/use-auth.tsx";
import { ReactNode } from "react";

export interface AuthResolverProps {
    children: ReactNode;
}

export function AuthResolver({ children }: AuthResolverProps) {
    const { isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    return children;
}
