import { useLocation } from "react-router";
import LoaderDotted from "../../components/common/LoaderDotted";
import useAuth from "../../hooks/useAuth";
import AdminDash from "../admin/AdminDash";
import StudentDash from "../student/StudentDash";
import TeacherDash from "../teacher/TeacherDash";

export default function DashBoard() {
  const { user, isUserLoading } = useAuth();
  const location = useLocation();

  if (isUserLoading) return <LoaderDotted />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (user?.role === "student") return <StudentDash />;
  if (user?.role === "teacher") return <TeacherDash />;
  if (user?.role === "admin") return <AdminDash />;
}
