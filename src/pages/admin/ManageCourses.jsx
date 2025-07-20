import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import LoaderSpinner from "../../components/common/LoaderSpinner";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function AllCourses() {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();

  const { data: coursesData = [], isLoading } = useQuery({
    queryKey: ["courses", { page: currentPage }],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_URL}/courses/all`,
        {
          params: { page: currentPage, limit: 10 },
        }
      );
      // console.log(res.data);

      return res.data;
    },
    enabled: user.accessToken !== null,
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      await axiosSecure.patch(`/courses/change-status/${id}`, {
        status,
      });
    },
    onSuccess: () => {
      toast.success("Status updated");
      queryClient.invalidateQueries(["courses"]);
    },
    onError: (error) => {
      toast.error("Failed to update status");
      console.log(error);
    },
  });

  const handleStatusChange = (id, status) => {
    Swal.fire({
      title: `Are you sure to ${status}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus.mutate({ id, status });
      }
    });
  };

  const handleNextPage = () => {
    if (coursesData.hasNextPage) {
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

  if (isLoading) return <LoaderSpinner />;

  if (coursesData.length === 0) {
    return <div className="text-center py-10">No courses found</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Courses</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full border-gray-300 min-w-[1000px]">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Email</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coursesData.courses.map((course) => (
              <tr key={course._id}>
                <td>
                  <img
                    src={course.image}
                    alt="Course"
                    className="w-16 h-12 rounded"
                  />
                </td>
                <td>{course.title}</td>
                <td>{course.instructorEmail}</td>

                <td>
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
                </td>
                <td>
                  <Link
                    to={`/dashboard/courses/${course._id}`}
                    disabled={course.status === "approved"}
                    className="btn btn-sm btn-secondary"
                  >
                    Progress
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-xs btn-primary text-white mr-2"
                    disabled={course.status === "approved"}
                    onClick={() => handleStatusChange(course._id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-xs btn-error text-white"
                    disabled={course.status === "rejected"}
                    onClick={() => handleStatusChange(course._id, "rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="join mt-10 flex justify-center">
          <button
            disabled={currentPage === 1}
            onClick={handlePrevPage}
            className="join-item btn text-lg"
          >
            «
          </button>
          <button className="join-item btn">
            Page {currentPage} of {coursesData.totalPages}
          </button>
          <button
            disabled={!coursesData.hasNextPage}
            onClick={handleNextPage}
            className="join-item btn text-lg"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
