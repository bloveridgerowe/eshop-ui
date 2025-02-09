import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { FullPageLoadingSpinner } from "@/components/FullPageLoadingSpinner";
import { RootState } from "@/state/store.ts";
import { Paths } from "@/utilities/Paths";

export function ProtectedRoute() {
  const { status } = useSelector((state: RootState) => state.auth);

  switch (status) {
    case "loading":
      return <FullPageLoadingSpinner />;
    case "unauthenticated":
      return <Navigate to={Paths.featured()} replace />;
    case "authenticated":
      return <Outlet />;
    default:
      return <FullPageLoadingSpinner />;
  }
}