import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const fetchCourses = async ({ queryKey }) => {
  const [, { page, searchTerm }] = queryKey;
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/courses`, {
    params: { page, limit: 6, searchTerm },
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
    } else {
      toast.error("No more pages available");
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else {
      toast.error("You are already on the first page");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
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
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.courses.map((course) => (
              <div
                key={course._id}
                className="border border-gray-200 p-4 rounded-xl shadow hover:shadow-lg"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-48 w-full object-cover rounded mb-3"
                />
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  Created by{" "}
                  <span className="font-semibold">
                    {course.instructor[0]?.name || "N/A"}
                  </span>
                </p>

                <p className="text-sm text-gray-600">
                  Enrolled Students:{" "}
                  <span className="font-semibold text-blue-600">
                    {course.totalEnrollments.toString().padStart(2, 0)}
                  </span>{" "}
                </p>
                <p className="text-gray-700 text-sm mt-2">
                  {course.shortDescription}
                </p>
                <p className="text-sm text-gray-600">Price: ${course.price}</p>
                <button className="mt-3 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
          <div className="join mt-10 flex justify-center">
            <button onClick={handlePrevPage} className="join-item btn text-lg">
              «
            </button>
            <button className="join-item btn">Page {currentPage}</button>
            <button onClick={handleNextPage} className="join-item btn text-lg">
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCourses;
