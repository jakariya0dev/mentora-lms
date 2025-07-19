import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import HeadTag from "../components/common/HeadTag";
import LoaderDotted from "../components/common/LoaderDotted";
import useAuth from "../hooks/useAuth";
import NoticeBoard from "./common/NoticeBoard";

const BeTeacher = () => {
  const { user } = useAuth();

  const becomeTeacherMutation = useMutation({
    mutationFn: async (data) => {
      const result = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/be-teacher/${user.email}`,
        data
      );
      return result.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Your request has been sent",
        text: "Please wait for approval. Thank you!",
        icon: "success",
        showConfirmButton: true,
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
    onError: (error) => {
      console.log(error);
      Swal.fire({
        title: "Something went wrong",
        text: "Please try again later.",
        icon: "error",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!user) return <LoaderDotted />;
  return (
    <>
      <HeadTag title="Become a Teacher | Mentora" />
      <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-2xl mt-10">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Become a Teacher
        </h2>
        <form
          onSubmit={handleSubmit(becomeTeacherMutation.mutate)}
          className="space-y-4"
        >
          {/* Image (preview only) */}
          <div className="flex flex-col items-center">
            <img
              src={user?.photoURL}
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 object-cover"
            />
            <label className="mt-1 font-medium">Profile Picture</label>
          </div>

          {/* Already Teacher */}
          {user?.status === "approved" && (
            <NoticeBoard title="You are already a teacher" />
          )}

          {/* Teacher Request Pending */}
          {user?.status === "pending" && (
            <NoticeBoard title="Your request is pending" />
          )}

          {/* Teacher Request Rejected */}
          {user?.status === "rejected" && (
            <NoticeBoard title="Your request has been rejected" />
          )}

          {/* Name (read-only) */}
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block font-medium">Experience Level</label>
            <select
              {...register("experience", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Select your experience
              </option>
              <option value="beginner">Beginner</option>
              <option value="mid-level">Mid-Level</option>
              <option value="experienced">Experienced</option>
            </select>
            {errors.experience && (
              <p className="text-red-500 text-sm">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              name="title"
              readOnly={
                user?.status === "approved" ||
                user?.status === "pending" ||
                user?.status === "rejected"
              }
              defaultValue={user?.title || ""}
              placeholder="e.g. MERN Stack Instructor"
              {...register("title", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium">Category</label>
            <select
              defaultValue={user?.category || ""}
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Web Development">Web Development</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="App Development">Mobile App Development</option>
              <option value="Data Science">Data Science</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              disabled={
                becomeTeacherMutation.isPending ||
                user?.status === "approved" ||
                user?.status === "pending" ||
                user?.status === "rejected"
              }
              type="submit"
              className="btn btn-primary mt-4 px-6"
            >
              {becomeTeacherMutation.isPending
                ? "Submitting..."
                : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BeTeacher;
