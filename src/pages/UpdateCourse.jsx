import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import handleUpload from "../utils/ImageUploadApi";

const UpdateCourse = ({ isOpen, setIsModalOpen, course, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Mutation to upload image to imagekit
  const uploadImageMutation = useMutation({
    mutationFn: handleUpload,
  });

  // Mutation to save course to DB
  const updateCourseMutation = useMutation({
    mutationFn: async (updatedCourse) => {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/courses/${course._id}`,
        updatedCourse
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Course updated successfully!");
      refetch();
      reset();
      setIsModalOpen(false);
    },
    onError: () => {
      toast.error("Failed to update course");
    },
  });

  // Form submit handler
  const onSubmit = async (updateData) => {
    if (updateData.image && updateData.image.length > 0) {
      const imageFile = updateData.image[0];
      const imageUrl = await uploadImageMutation.mutateAsync(imageFile);
      updateData.image = imageUrl;
    } else {
      updateData.image = course.image;
    }
    updateCourseMutation.mutate(updateData);
  };

  // Close modal handler
  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-xl rounded p-6 shadow-lg relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-4 text-lg font-bold"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Update Course</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              {...register("title", { required: true })}
              className="w-full input input-bordered"
              defaultValue={course.title}
            />
            {errors.title && (
              <span className="text-red-500 text-sm">Title is required</span>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Price ($)</label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: true })}
              className="w-full input input-bordered"
              defaultValue={course.price}
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
              defaultValue={course.description}
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
              {...register("image")}
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
              uploadImageMutation.isPending || updateCourseMutation.isPending
            }
          >
            {uploadImageMutation.isPending || updateCourseMutation.isPending
              ? "Updating..."
              : "Update Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
