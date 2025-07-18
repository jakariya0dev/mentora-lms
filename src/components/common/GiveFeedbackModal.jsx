import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function GiveFeedbackModal({
  setIsModalOpen,
  courseId,
  existingFeedbacks,
  queryClient,
}) {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [rating, setRating] = useState(existingFeedbacks[0]?.rating || 3);
  const modalRef = useRef(null);
  const axiosSecure = useAxiosSecure();

  // console.log(existingFeedbacks);

  // feedback submit mutation
  const addFeedbackMutation = useMutation({
    mutationFn: (data) => {
      return axiosSecure.post(`/feedbacks`, data);
    },
    onSuccess: () => {
      resetTheModal();
      toast.success("Feedback submitted successfully.");
      queryClient.invalidateQueries(["feedbacks", courseId]);
    },
    onError: (error) => {
      resetTheModal();
      toast.error("Failed to submit feedback.");
      console.error(error);
    },
  });

  // update feedback mutation
  const updateFeedbackMutation = useMutation({
    mutationFn: (data) => {
      return axiosSecure.patch(`/feedbacks/${existingFeedbacks[0]?._id}`, data);
      // console.log(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["feedbacks", courseId]);
      resetTheModal();
      toast.success("Feedback updated successfully.");
    },
    onError: (error) => {
      resetTheModal();
      toast.error("Failed to update feedback.");
      console.error(error);
    },
  });

  const onSubmit = (data) => {
    const feedback = { ...data, rating, courseId, studentEmail: user.email };
    addFeedbackMutation.mutate(feedback);
  };

  const onUpdate = (data) => {
    const feedback = { ...data, rating };
    console.log(data, feedback);
    updateFeedbackMutation.mutate(feedback);
  };

  const resetTheModal = () => {
    reset();
    setRating(3);
    setIsModalOpen(false);
  };

  //   if (isLoading) return <div>Loading...</div>;

  const addFeedbackButton = (
    <button
      type="submit"
      disabled={addFeedbackMutation.isPending}
      className={`${
        addFeedbackMutation.isLoading
          ? "bg-blue-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      } text-white px-4 py-2 rounded`}
    >
      {addFeedbackMutation.isPending ? "Submitting..." : "Submit Feedback"}
    </button>
  );

  const updateFeedbackButton = (
    <button
      type="submit"
      disabled={addFeedbackMutation.isPending}
      className={`${
        addFeedbackMutation.isLoading
          ? "bg-blue-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      } text-white px-4 py-2 rounded`}
    >
      {addFeedbackMutation.isPending ? "Submitting..." : "Update Feedback"}
    </button>
  );

  return (
    <div className="fixed inset-0 bg-[#00000090] z-50 flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative animate-fadeIn"
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
          onClick={() => setIsModalOpen(false)}
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold mb-4">Give Feedback</h2>

        <form
          onSubmit={handleSubmit(
            existingFeedbacks.length > 0 ? onUpdate : onSubmit
          )}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              defaultValue={existingFeedbacks[0]?.description || ""}
              rows={4}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write your feedback..."
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Rating
            </label>
            <StarRatings
              rating={rating}
              starRatedColor="#ffd700"
              starHoverColor="#ffc107"
              changeRating={(newRating) => setRating(newRating)}
              numberOfStars={5}
              name="rating"
              starDimension="32px"
              starSpacing="5px"
            />
          </div>

          <div className="text-right">
            {existingFeedbacks && existingFeedbacks.length > 0
              ? updateFeedbackButton
              : addFeedbackButton}
          </div>
        </form>
      </div>
    </div>
  );
}
