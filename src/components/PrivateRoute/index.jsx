import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ redirect = "/" }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to={redirect} />;

  return <Outlet />;
};
