import { Navigate, Outlet } from "react-router-dom";
import { Paths } from "@/utilities/paths";
import { useAuth } from "@/components/utilities/AuthProvider";

export function ProtectedRoute() {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to={Paths.products()} replace/>;
    }

    return <Outlet/>;
}
