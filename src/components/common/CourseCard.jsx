import { Link } from "react-router";

export default function CourseCard({ course, index }) {
  const renderStars = (rating) => {
    const stars = Math.round(rating);
    return "★".repeat(stars) + "☆".repeat(5 - stars);
  };

  return (
    <div key={index} className="px-3">
      <Link to={`/course/${course.slug}`}>
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 h-full text-left">
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
              By {course.instructor}{" "}
              <span className="text-sm text-yellow-500 mb-1">
                {renderStars(course.rating)}({course.rating.toFixed(1)})
              </span>
            </p>
            <p className="text-indigo-600 font-medium mb-1">
              {course.enrollments.toLocaleString()} Enrollments
            </p>

            <p className="text-xs text-gray-500 mb-1">
              Category: <span className="font-medium">{course.category}</span>
            </p>
            <p className="text-base font-bold text-green-600">
              ${course.price.toFixed(2)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
