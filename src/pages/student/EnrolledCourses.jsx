import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import LoaderDotted from "../../components/common/LoaderDotted";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function EnrolledCouses() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: enrolledCourses = [], isLoading } = useQuery({
    queryKey: ["enrolledCourses"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/courses/enrolled/${user?.email}`
      );

      // console.log(response.data);
      return response.data.enrolledCourses;
    },
    enabled: user.accessToken !== null,
  });

  if (isLoading) return <LoaderDotted />;

  if (enrolledCourses.length === 0)
    return (
      <div className="h-screen p-10">
        <h2 className="text-2xl font-bold mb-2">Enrolled Courses</h2>
        <p className="text-xl">You are not enrolled in any course yet</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {enrolledCourses.map((course) => (
        <div
          key={course._id}
          className="bg-white rounded-2xl shadow p-4 flex flex-col"
        >
          <img
            src={course.courseInfo.image}
            alt={course.title}
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
          <h2 className="text-xl font-semibold mb-1">
            {course.courseInfo.title}
          </h2>
          <p className="text-gray-600 mb-4">
            Created By:{" "}
            <span className="font-semibold">
              {course.instructor[0]?.displayName}
            </span>
          </p>
          <Link
            to={`/dashboard/assignments/${course.courseInfo._id}`}
            className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700"
          >
            Continue
          </Link>
        </div>
      ))}
    </div>
  );
}
