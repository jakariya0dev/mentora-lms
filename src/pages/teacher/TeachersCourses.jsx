import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import LoaderDotted from "../../components/common/LoaderDotted";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UpdateCourse from "./UpdateCourse";

export default function TeachersCourses() {
  const [page, setPage] = useState(1);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["my-courses", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/courses/teacher/${user.email}?page=${page}&limit=9`
      );
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      console.log(id);

      const res = await axiosSecure.delete(`/courses/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Course deleted");
      queryClient.invalidateQueries(["my-courses", user.email]);
    },
    onError: (err) => {
      toast.error("Failed to delete course");
      console.error(err);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setIsUpdateModalOpen(true);
  };

  const handleNextPage = () => {
    if (data.hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (isLoading) return <LoaderDotted />;
  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">My Courses</h2>

        {data.courses?.length === 0 ? (
          <p>You haven't added any courses yet.</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.courses?.map((course) => (
                <div
                  key={course._id}
                  className="card shadow-lg border border-gray-200 p-4 rounded-lg"
                >
                  <img
                    src={course.image}
                    alt="Course"
                    className="w-full h-40 object-cover rounded"
                  />
                  <div className="mt-3">
                    <h3 className="text-lg font-bold">{course.title}</h3>

                    <p className="mt-2">
                      <span className="text-sm font-semibold">Price:</span> $
                      {course.price}
                    </p>

                    <p className="mt-2">
                      <span className="font-semibold">Status:</span>{" "}
                      <span
                        className={`badge ${
                          course.status === "approved"
                            ? "badge-success"
                            : course.status === "rejected"
                            ? "badge-error"
                            : "badge-warning"
                        }`}
                      >
                        {course.status}
                      </span>
                    </p>

                    <div className="flex flex-wrap gap-2 mt-6">
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => handleEdit(course)}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>

                      {course.status === "approved" ? (
                        <Link
                          to={`${course._id}`}
                          className="btn btn-sm btn-secondary"
                        >
                          See Details
                        </Link>
                      ) : (
                        <button className="btn btn-sm btn-disabled">
                          See Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-center gap-4">
              <button
                disabled={page === 1}
                onClick={handlePrevPage}
                className="btn btn-primary"
              >
                Previous
              </button>
              <div className="px-4 py-1 border border-gray-300 rounded">
                Page: {page} of {data.totalPages}
              </div>
              <button
                disabled={!data.hasNextPage}
                onClick={handleNextPage}
                className="btn btn-primary"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      <UpdateCourse
        course={selectedCourse}
        isOpen={isUpdateModalOpen}
        setIsOpen={setIsUpdateModalOpen}
        refetch={refetch}
      />
    </>
  );
}
