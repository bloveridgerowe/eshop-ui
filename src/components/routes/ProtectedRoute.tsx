import { Navigate, Outlet } from "react-router-dom";
import { Paths } from "@/utilities/paths";
import { useAuth } from "@/hooks/use-auth";

export function ProtectedRoute() {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to={Paths.featured()} replace/>;
    }

    return <Outlet/>;
}
