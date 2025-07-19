import { Navigate, Outlet, useLocation } from "react-router";
import DashboardSidebar from "../../components/common/DashboardSidebar";
import HeadTag from "../../components/common/HeadTag";
import LoaderDotted from "../../components/common/LoaderDotted";
import useAuth from "../../hooks/useAuth";

export default function DashBoard() {
  const { user, isUserLoading } = useAuth();
  const location = useLocation();

  if (isUserLoading) return <LoaderDotted />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return (
    <>
      <HeadTag title="Mentora | Dashboard" />
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <div className="flex-1 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </>
  );
}
