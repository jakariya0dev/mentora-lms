import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import UpdateCourse from "./UpdateCourse";

export default function TeachersCourses() {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: myCourses = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-courses", user.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/courses?email=${user.email}`
      );

      return res.data.courses;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      console.log(id);

      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/courses/${id}`
      );
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

  if (isLoading) return <p>Loading your courses...</p>;
  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">My Courses</h2>

        {isLoading ? (
          <p>Loading your courses...</p>
        ) : myCourses.length === 0 ? (
          <p>You haven't added any courses yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myCourses.map((course) => (
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
                  <p>
                    <span className="text-sm font-semibold">Instructor:</span>{" "}
                    {course.name}
                  </p>
                  <p>
                    <span className="text-sm font-semibold">Email:</span>{" "}
                    {course.email}
                  </p>
                  <p>
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

                  <div className="flex flex-wrap gap-2 mt-3">
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
