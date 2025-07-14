import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function AllUsers() {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users?search=${search}`
      );

      return res.data.users;
    },
  });

  const makeAdmin = useMutation({
    mutationFn: async (id) => {
      return await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/users/admin/${id}`
      );
    },
    onSuccess: () => {
      toast.success("User promoted to admin");
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => toast.error("Failed to promote user"),
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const text = e.target.search.value.trim();
    setSearch(text);
  };

  const handleMakeAdmin = (id) => {
    Swal.fire({
      icon: "question",
      title: "Are you sure?",
      text: "You want to make this user an admin!",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdmin.mutate(id);
      }
    });
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-semibold mb-4">All Users</h2>

        <form onSubmit={handleSearch} className="mb-4">
          <input
            name="search"
            type="text"
            placeholder="Search by name or email"
            className="input input-bordered w-64"
          />
          <button className="btn btn-primary ml-2" type="submit">
            Search
          </button>
        </form>
      </div>

      {isLoading ? (
        <p className="text-center my-10">Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Make Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <img
                      src={
                        user.photoURL ||
                        "https://randomuser.me/api/portraits/lego/1.jpg"
                      }
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`text-sm badge ${
                        user.role === "admin"
                          ? "badge-success"
                          : user.role === "teacher"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {user.role || "user"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleMakeAdmin(user._id)}
                      disabled={user.role === "admin"}
                    >
                      {user.role === "admin" ? "Admin" : "Make Admin"}
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
