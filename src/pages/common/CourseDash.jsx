import LoaderDotted from "../../components/common/LoaderDotted";
import useAuth from "../../hooks/useAuth";
import ManageCourses from "../admin/ManageCourses";
import EnrolledCouses from "../student/EnrolledCourses";
import TeachersCourses from "../teacher/TeachersCourses";

export default function CourseDash() {
  const { user } = useAuth();

  if (!user) return <LoaderDotted />;
  if (user?.role === "student") return <EnrolledCouses />;
  if (user?.role === "teacher") return <TeachersCourses />;
  if (user?.role === "admin") return <ManageCourses />;
}
