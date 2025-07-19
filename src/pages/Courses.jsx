import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";
import LoaderDotted from "../components/common/LoaderDotted";

const fetchCourses = async ({ queryKey }) => {
  const [, { page, searchTerm }] = queryKey;
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/courses`, {
    params: { page, limit: 9, searchTerm },
  });
  return res.data;
};

const AllCourses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputTerm, setInputTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["courses", { page: currentPage, searchTerm }],
    queryFn: fetchCourses,
  });

  const handleSearch = () => {
    setSearchTerm(inputTerm);
    refetch();
  };

  console.log(data);

  const handleNextPage = () => {
    if (data.hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const renderStars = (rating) => {
    const stars = Math.round(rating);
    return "★".repeat(stars) + "☆".repeat(5 - stars);
  };

  if (isLoading) return <LoaderDotted />;

  if (data.length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold">No courses found</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-4 text-center">All Courses</h2>

      {/* Search Bar */}
      <div className="flex gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search by title..."
          className="border px-4 py-2 rounded w-full md:w-1/2"
          value={inputTerm}
          onChange={(e) => setInputTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Courses List */}

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.length === 0 ? (
            <p className="text-center text-gray-500">No courses found</p>
          ) : (
            data.courses.map((course) => (
              <div
                key={course._id}
                className="border border-gray-200 p-4 rounded-xl shadow hover:shadow-lg"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-48 w-full object-cover rounded mb-4"
                />
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className=" text-gray-600 mb-1">
                  Created by{" "}
                  <span className="font-semibold">
                    {course.instructor[0]?.name || "N/A"}{" "}
                    <span className="text-sm text-yellow-500 mb-1">
                      {renderStars(course.rating)} ({course.rating?.toFixed(1)})
                    </span>
                  </span>
                </p>

                <p className="text-gray-600">
                  Enrolled Students:{" "}
                  <span className="font-semibold text-blue-600">
                    {course.totalEnrollments.toString().padStart(2, 0)}
                  </span>{" "}
                </p>
                <p className="text-gray-600 mt-3">
                  {course.description?.slice(0, 100) + " ..."}
                </p>
                <div className="mt-5 flex justify-between items-center">
                  <p className="text-gray-600 text-xl font-semibold">
                    Price: ${course.price}
                  </p>
                  <Link
                    to={`/courses/${course._id}`}
                    className=" bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="join mt-10 flex justify-center">
          <button
            disabled={currentPage === 1}
            onClick={handlePrevPage}
            className="join-item btn text-lg"
          >
            «
          </button>
          <button className="join-item btn">
            Page {currentPage} of {data.totalPages}
          </button>
          <button
            disabled={!data.hasNextPage}
            onClick={handleNextPage}
            className="join-item btn text-lg"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
