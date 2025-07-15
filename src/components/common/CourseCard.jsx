import { Link } from "react-router";

export default function CourseCard({ course, index }) {
  const renderStars = (rating) => {
    const stars = Math.round(rating);
    return "★".repeat(stars) + "☆".repeat(5 - stars);
  };

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
            Created By {course.instructor[0]?.name}{" "}
            <span className="text-sm text-yellow-500 mb-1">
              {renderStars(course.rating)} ({course.rating?.toFixed(1)})
            </span>
          </p>
          <p className="text-indigo-600 font-medium mb-1">
            Enrolled Students:{" "}
            {course.totalEnrollments?.toString().padStart(2, 0)}
          </p>

          <p className="text-sm text-gray-500 mb-1">
            Category: <span className="font-medium">{course.category}</span>
          </p>
          <div className="flex justify-between items-center mt-4">
            <p className="text-base font-bold text-indigo-600">
              Price: ${Number(course.price).toFixed(2)}
            </p>
            <Link
              to={`/courses/${course._id}`}
              className="mt-4 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
