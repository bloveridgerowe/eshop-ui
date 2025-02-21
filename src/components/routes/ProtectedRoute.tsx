import { Navigate, Outlet } from "react-router-dom";
import { Paths } from "@/utilities/paths";
import { useAuth } from "@/components/utilities/AuthProvider.tsx";

export function ProtectedRoute() {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to={Paths.featured()} replace/>;
    }

    return <Outlet/>;
}
