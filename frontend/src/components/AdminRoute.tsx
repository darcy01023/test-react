import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function AdminRoute() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/users/login" replace />;
  }

  if (!user?.admin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}