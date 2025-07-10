import LoaderDotted from "../components/common/LoaderDotted";
import AdminDash from "../components/dashboard/AdminDash";
import StudentDash from "../components/dashboard/StudentDash";
import TeacherDash from "../components/dashboard/TeacherDash";
import useAuth from "../hooks/useAuth";

export default function DashBoard() {
  const { user } = useAuth();

  if (!user) return <LoaderDotted />;
  if (user?.role === "student") return <StudentDash />;
  if (user?.role === "teacher") return <TeacherDash />;
  if (user?.role === "admin") return <AdminDash />;
}
