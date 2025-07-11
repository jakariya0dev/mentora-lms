import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import handleUpload from "../utils/ImageUploadApi";

export default function AddCourse() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // Mutation to upload image to imagekit
  const uploadImageMutation = useMutation({
    mutationFn: handleUpload,
  });

  // Mutation to save course to DB
  const saveCourseMutation = useMutation({
    mutationFn: async (course) => {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/courses/add`,
        course
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Course added successfully!");
      reset();
      navigate("/dashboard/courses");
    },
    onError: () => {
      toast.error("Failed to add course");
    },
  });

  // Form submit handler
  const onSubmit = async (data) => {
    const imageFile = data.image[0];
    const imageUrl = await uploadImageMutation.mutateAsync(imageFile);
    data.image = imageUrl;
    saveCourseMutation.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto my-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Course</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            {...register("title", { required: true })}
            className="w-full input input-bordered"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">Title is required</span>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Instructor Name</label>
          <input
            defaultValue={user?.displayName || ""}
            readOnly
            {...register("name", { required: true })}
            className="w-full input input-bordered bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Instructor Email</label>
          <input
            {...register("email", { required: true })}
            defaultValue={user?.email || ""}
            readOnly
            className="w-full input input-bordered bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price ($)</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: true })}
            className="w-full input input-bordered"
          />
          {errors.price && (
            <span className="text-red-500 text-sm">Price is required</span>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full textarea textarea-bordered"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              Description is required
            </span>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Image Upload</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full"
          />
          {errors.image && (
            <span className="text-red-500 text-sm">
              Course image is required
            </span>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={
            uploadImageMutation.isPending || saveCourseMutation.isPending
          }
        >
          {uploadImageMutation.isPending || saveCourseMutation.isPending
            ? "Uploading..."
            : "Add Class"}
        </button>
      </form>
    </div>
  );
}
