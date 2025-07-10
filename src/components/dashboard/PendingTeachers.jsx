import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import LoaderDotted from "../common/LoaderDotted";

const fetchPendingTeachers = async (page = 1, limit = 10) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/teachers?page=${page}&limit=${limit}`
  );

  console.log(data);

  return data;
};

const PendingTeachers = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["pendingTeachers", page],
    queryFn: () => fetchPendingTeachers(page),
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/change-teacher-status/${id}`,
        { status }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingTeachers"]);
      toast.success("Status updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update status. Try again.");
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
        statusMutation.mutate({ id, status });
      }
    });
  };

  if (!data) return <LoaderDotted />;
  if (isLoading) return <LoaderDotted />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Pending Teacher Requests</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gray-200 ">
            <tr className="text-left">
              <th className="py-2 text-center">Image</th>
              <th className="py-2">Name</th>
              <th className="py-2">Experience</th>
              <th className="py-2">Title</th>
              <th className="py-2">Category</th>
              <th className="py-2">Status</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.teachers?.map((teacher) => (
              <tr
                key={teacher._id}
                className="border-b border-gray-300 hover:bg-gray-100"
              >
                <td className="py-2">
                  <img
                    src={teacher.photoURL}
                    alt="profile"
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td>{teacher.name}</td>
                <td>{teacher.experience}</td>
                <td>{teacher.title}</td>
                <td>{teacher.category}</td>
                <td
                  className={`capitalize font-semibold ${
                    teacher.status === "approved"
                      ? "text-blue-500"
                      : "text-red-500"
                  }`}
                >
                  {teacher.status}
                </td>
                <td className="space-x-2">
                  <button
                    disabled={
                      teacher.status === "approved" ||
                      teacher.status === "rejected"
                    }
                    className="bg-green-500 px-3 py-1 text-white rounded disabled:opacity-50"
                    onClick={() => handleStatusChange(teacher._id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    disabled={
                      teacher.status === "approved" ||
                      teacher.status === "rejected"
                    }
                    className="bg-red-500 px-3 py-1 text-white rounded disabled:opacity-50"
                    onClick={() => handleStatusChange(teacher._id, "rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-1 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingTeachers;
