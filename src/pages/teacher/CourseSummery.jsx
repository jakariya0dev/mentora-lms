import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import LoaderDotted from "../../components/common/LoaderDotted";

const CourseSummery = () => {
  const { courseId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  // ------------------ FETCH CLASS STATS ------------------ //
  const { data: courseStats, isLoading } = useQuery({
    queryKey: ["courseStats", courseId],
    queryFn: async () => {
      const submissions = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/submissions/${courseId}`
      );

      const enrollments = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/enrollments/${courseId}`
      );

      const assignments = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/assignments/${courseId}`
      );

      const result = {
        submissions: submissions.data.submissions,
        enrollments: enrollments.data.enrollments,
        assignments: assignments.data.assignments,
      };

      return result;
    },
    onError: (error) => {
      console.error("Error fetching course stats:", error);
    },
    enabled: !!courseId,
  });

  // ------------------ CREATE ASSIGNMENT ------------------ //
  const addAssignmentMutation = useMutation({
    mutationFn: async (newAssignment) => {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/assignments`,
        newAssignment
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["courseStats", courseId]);
      setModalOpen(false);
      reset();
    },
  });

  // ------------------ SUBMIT FORM ------------------ //
  const onSubmit = (data) => {
    data.courseId = courseId;
    data.createdAt = new Date();
    addAssignmentMutation.mutate(data);
    reset();
    setModalOpen(false);
  };

  if (isLoading) return <LoaderDotted />;

  return (
    <div className="p-6 flex-1 mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Class Progress</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card
          title="Total Enrollments"
          count={courseStats?.enrollments?.length || 0}
        />
        <Card
          title="Total Assignments"
          count={courseStats?.assignments?.length || 0}
        />
        <Card
          title="Total Submissions"
          count={courseStats?.submissions?.length || 0}
        />
      </div>

      <div className="text-right">
        <button onClick={() => setModalOpen(true)} className="btn btn-success">
          Create Assignment
        </button>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-md w-[400px]">
            <h3 className="text-lg font-semibold mb-4">Add Assignment</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <label htmlFor="title" className="label mb-1">
                  Assignment Title:
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Write title here..."
                  {...register("title", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label htmlFor="deadline" className="label mb-1">
                  Deadline:
                </label>
                <input
                  min={new Date().toISOString().split("T")[0]}
                  id="deadline"
                  type="date"
                  {...register("deadline", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label htmlFor="description" className="label mb-1">
                  Description:
                </label>
                <textarea
                  placeholder="Assignment Description"
                  {...register("description", { required: true })}
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                {!addAssignmentMutation.isPending && (
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={addAssignmentMutation.isPending}
                >
                  {addAssignmentMutation.isPending
                    ? "Submitting..."
                    : "Add Assignment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseSummery;

// Reusable card component
const Card = ({ title, count }) => (
  <div className="bg-white shadow-md p-4 rounded-md">
    <h4 className="text-lg font-medium">{title}</h4>
    <p className="text-2xl font-bold text-blue-600 mt-2">{count}</p>
  </div>
);
