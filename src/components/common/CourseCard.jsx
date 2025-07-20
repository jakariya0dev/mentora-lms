import { Link } from "react-router";
import renderStars from "../../utils/renderStarts";

export default function CourseCard({ course, index }) {
  return (
    <div
      key={index}
      className="p-3 m-2 border border-gray-200 rounded-lg shadow-md"
    >
      <div className="overflow-hidden h-full text-left">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-60 object-cover hover:scale-105 transition duration-300"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 mb-1">
            Created By{" "}
            <span className="font-medium">
              {course.instructor[0]?.displayName}
            </span>{" "}
            <span className="text-sm text-yellow-500 mb-1">
              {renderStars(course.rating)} ({course.rating?.toFixed(1)})
            </span>
          </p>
          <p className="text-indigo-600 font-medium mb-1">
            Total {course.totalEnrollments?.toString().padStart(2, 0)} Students
            Enrolled
          </p>

          <p className="text-sm text-gray-500 mb-1">
            Category:{" "}
            <span className="font-medium">
              {course.instructor[0]?.category}
            </span>
          </p>
          <div className="flex justify-between items-center mt-8">
            <p className="text-xl font-semibold text-gray-600">
              Price: ${Number(course.price).toFixed(2)}
            </p>
            <Link
              to={`/courses/${course._id}`}
              className=" bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
