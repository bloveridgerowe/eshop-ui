import { useAuth } from "@/hooks/use-auth.tsx";

export interface AuthResolverProps {
    children: React.ReactNode;
}

export function AuthResolver({ children }: AuthResolverProps) {
    const { isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    return children;
}
