import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import LoaderSpinner from "../../components/common/LoaderSpinner";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PendingTeachers = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["teachersData", page],
    queryFn: () => fetchTeachers(page),
    enabled: user.accessToken !== null,
  });

  const fetchTeachers = async (page = 1, limit = 10) => {
    const { data } = await axiosSecure.get(
      `/teachers?page=${page}&limit=${limit}`
    );
    // console.log(data);
    return data;
  };

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return await axiosSecure.patch(`/change-teacher-status/${id}`, {
        status,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["teachersData"]);
      toast.success("Status updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update status.");
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

  if (isLoading) return <LoaderSpinner />;

  if (data?.teachers?.length === 0) {
    return (
      <div className="p-10">
        <h2 className="text-2xl font-semibold mb-4">All Teachers</h2>
        <p className="text-xl">No teacher found.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Pending Teacher Requests</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 min-w-[1000px]">
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
            onClick={handlePrevPage}
            className="btn btn-primary"
          >
            Previous
          </button>
          <div className="px-4 py-1 border border-gray-300 rounded">
            Page: {page}
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
    </div>
  );
};

export default PendingTeachers;
