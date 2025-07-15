import { Navigate, useLocation } from "react-router";
import LoaderDotted from "../components/common/LoaderDotted";
import useAuth from "../hooks/useAuth";

export default function RoleBasedRoute({ children, allowedRoles = [] }) {
  const { user, isUserLoading } = useAuth();
  const location = useLocation();

  if (isUserLoading) return <LoaderDotted />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
}
