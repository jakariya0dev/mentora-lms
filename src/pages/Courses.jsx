import LoaderDotted from "../components/common/LoaderDotted";
import AllCourses from "../components/dashboard/AllCourses";
import useAuth from "../hooks/useAuth";
import EnrolledCouses from "./EnrolledCourses";
import TeachersCourses from "./TeachersCourses";

export default function Courses() {
  const { user } = useAuth();

  if (!user) return <LoaderDotted />;
  if (user?.role === "student") return <EnrolledCouses />;
  if (user?.role === "teacher") return <TeachersCourses />;
  if (user?.role === "admin") return <AllCourses />;
}
