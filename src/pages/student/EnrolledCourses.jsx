import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function EnrolledCouses() {
  const { user } = useAuth();

  const { data: enrolledCourses = [] } = useQuery({
    queryKey: ["enrolledCourses"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/courses/enrolled/${user?.email}`
      );

      console.log("Enrolled courses fetched:", response.data.courses);
      return response.data.courses;
    },
  });

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
          <h2 className="text-xl font-semibold mb-1">{course.title}</h2>
          <p className="text-gray-600 mb-4">
            Created By:{" "}
            <span className="font-semibold">{course.instructor[0]?.name}</span>
          </p>
          <Link
            to={`/dashboard/assignments/${course._id}`}
            className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700"
          >
            Continue
          </Link>
        </div>
      ))}
    </div>
  );
}
