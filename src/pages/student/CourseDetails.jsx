// pages/CourseDetails.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import renderStars from "../../utils/renderStarts";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/courses/${id}`
        );
        setCourse(res.data.course);
      } catch (err) {
        console.error("Error loading course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handlePay = () => {
    navigate(`/payment/${id}`);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!course) return <div className="text-center py-10">Course not found</div>;

  return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="bg-white shadow rounded-lg overflow-hidden p-6 space-y-6">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-120 object-cover shadow-lg rounded mb-10"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 ">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">{course.title}</h2>
            <p className="text-gray-700 text-justify">{course.description}</p>
          </div>

          <div className="space-y-4">
            <p>
              <strong>Created By:</strong> {course.instructor[0]?.name}
            </p>
            <p>
              <strong>Total Enrolled:</strong>{" "}
              {course.enrollments?.length.toString().padStart(2, "0") || 0}{" "}
              students
            </p>
            <p>
              <strong>Price:</strong> ${course.price}
            </p>
            <p>
              <strong>Rating:</strong> {course.rating}{" "}
              {renderStars(course.rating)}
            </p>
            <button
              onClick={handlePay}
              className="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
