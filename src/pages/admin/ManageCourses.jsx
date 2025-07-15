import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function AllCourses() {
  const queryClient = useQueryClient();

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/courses/all`
      );
      return res.data.courses;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      return await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/courses/change-status/${id}`,
        { status }
      );
    },
    onSuccess: () => {
      toast.success("Status updated");
      queryClient.invalidateQueries(["courses"]);
    },
    onError: () => toast.error("Failed to update status"),
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Courses</h2>

      {isLoading ? (
        <p className="text-center py-10">Loading courses...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
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
              {courses.map((course) => (
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
                    <progress
                      className="progress progress-info w-24"
                      value={
                        course.status === "approved"
                          ? 100
                          : course.status === "rejected"
                          ? 0
                          : 50
                      }
                      max="100"
                    />
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-xs btn-primary text-white"
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
        </div>
      )}
    </div>
  );
}
