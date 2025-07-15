import { Navigate, useLocation } from "react-router";
import LoaderDotted from "../components/common/LoaderDotted";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { user, isUserLoading } = useAuth();
  const location = useLocation();

  if (isUserLoading) return <LoaderDotted />;

  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
}
