import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import GiveFeedbackModal from "../../components/common/GiveFeedbackModal";
import LoaderDotted from "../../components/common/LoaderDotted";
import useAuth from "../../hooks/useAuth";

const CourseAssignments = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  // Fetching assignments for the course
  const {
    data: assignments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["assignments", courseId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/assignments/${courseId}/${user.email}`
      );
      return data.assignments;
    },
    enabled: !!courseId,
  });

  // Get feedback mutation

  const { data: existingFeedbacks } = useQuery({
    queryKey: ["feedbacks", courseId, user.email],
    queryFn: async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/feedbacks?courseId=${courseId}&studentEmail=${user.email}`
      );
      console.log("Feedbacks fetched:", response.data?.feedbacks);

      return response.data.feedbacks;
    },
    onError: (error) => {
      console.error("Error fetching feedbacks:", error);
    },
    enabled: !!courseId && !!user?.email,
  });

  const submitMutation = useMutation({
    mutationFn: async (submissionData) => {
      return axios.post(
        `${import.meta.env.VITE_BASE_URL}/submissions`,
        submissionData
      );
    },
    onSuccess: () => {
      toast.success("Assignment submitted successfully!");
      queryClient.invalidateQueries(["assignments", courseId]);
    },
    onError: () => {
      toast.error("Failed to submit assignment.");
    },
  });

  const onSubmit = (data) => {
    if (!data.submissionLink) {
      toast.error("Please enter a valid submission link.");
      return;
    }

    const payload = {
      assignmentId: data.assignmentId,
      courseId,
      studentEmail: user.email,
      submissionLink: data.submissionLink,
      submittedAt: new Date().toISOString(),
    };

    submitMutation.mutate(payload);
    setValue("submissionLink", "");
  };

  if (isLoading) return <LoaderDotted />;
  if (isError)
    return (
      <p className="text-red-500 mt-10 text-center">
        Error loading assignments.
      </p>
    );

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Give Feedback
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Course Assignments</h2>
      {assignments.length === 0 ? (
        <p>No assignments available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border border-gray-200">Title</th>
                <th className="px-4 py-2 border border-gray-200">
                  Description
                </th>
                <th className="px-4 py-2 border border-gray-200">Deadline</th>
                <th className="px-4 py-2 border border-gray-200">Submission</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment._id} className="border-t border-gray-200">
                  <td className="px-4 py-2 border border-gray-200 font-semibold">
                    {assignment.title}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {assignment.description}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 text-sm text-red-600">
                    {new Date(assignment.deadline).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {assignment._id ===
                    assignment.studentSubmission[0].assignmentId ? (
                      <p className="text-blue-600">Submitted</p>
                    ) : (
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="hidden"
                          value={assignment._id}
                          {...register("assignmentId")}
                        />
                        <input
                          type="url"
                          placeholder="Submission link"
                          className="border p-1 rounded text-sm w-48"
                          {...register("submissionLink", {
                            required: "Submission link is required",
                          })}
                        />
                        <button
                          type="submit"
                          disabled={submitMutation.isPending}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                        >
                          {submitMutation.isLoading
                            ? "Submitting..."
                            : "Submit"}
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <GiveFeedbackModal
          setIsModalOpen={setIsModalOpen}
          courseId={courseId}
          existingFeedbacks={existingFeedbacks}
          queryClient={queryClient}
        />
      )}
    </div>
  );
};

export default CourseAssignments;
