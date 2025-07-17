import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

export default function AssignmentModal({
  setIsAssignmentModalOpen,
  assignmentId,
  courseId,
  queryClient,
}) {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  // feedback submit mutation
  const submitAssignmentMutation = useMutation({
    mutationFn: (data) => {
      return axios.post(`${import.meta.env.VITE_BASE_URL}/submissions`, data);
    },
    onSuccess: () => {
      toast.success("Assignment submitted successfully.");
      queryClient.invalidateQueries(["assignments", courseId]);
      reset();
      setIsAssignmentModalOpen(false);
    },
    onError: (error) => {
      toast.error("Failed to submit feedback.");
      console.error(error);
    },
  });

  const onSubmit = (data) => {
    const assignment = {
      ...data,
      assignmentId,
      courseId,
      studentEmail: user.email,
      submittedAt: new Date(),
    };
    submitAssignmentMutation.mutate(assignment);
  };

  return (
    <div className="fixed inset-0 bg-[#00000090] z-50 flex justify-center items-center transition-all">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative animate-fadeIn">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
          onClick={() => setIsAssignmentModalOpen(false)}
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold mb-4">Submit Assignment</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Your Submission
            </label>
            <textarea
              {...register("submission", { required: true })}
              rows={4}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write your submission..."
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className={`${
                submitAssignmentMutation.isPending
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white px-4 py-2 rounded`}
            >
              {submitAssignmentMutation.isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
