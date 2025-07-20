import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import statsImage from "../../assets/images/stats.jpg";

export default function PlatformStats() {
  const { data: statistics = [] } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/statistics`
      );

      return response.data.data;
    },
  });
  return (
    <section className="py-16 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side - Cards */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-600 mb-2">
            Unlock Your Potential with{" "}
            <span className="text-indigo-600">Mentora</span>
          </h2>
          <p className="text-gray-600 mb-10">
            AI powered learning platform for tech, design, freelancing, and
            more.
          </p>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h3 className="text-4xl md:text-6xl font-bold text-gray-600">
                {statistics?.totalUsers || 0}+
              </h3>
              <p className="font-semibold text-gray-500 text-lg">Total Users</p>
            </div>
            <div className="w-0.5 h-16 bg-gray-300"></div>
            <div className="flex flex-col">
              <h3 className="text-4xl md:text-6xl font-bold text-gray-600">
                {statistics?.totalCourses || 0}+
              </h3>
              <p className="font-semibold text-gray-500 text-lg">Courses</p>
            </div>
            <div className="w-0.5 h-16 bg-gray-300"></div>
            <div className="flex flex-col">
              <h3 className="text-4xl md:text-6xl font-bold text-gray-600">
                {statistics?.totalEnrollments || 0}+
              </h3>
              <p className="font-semibold text-gray-500 text-lg">
                Total Enrollments
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="flex justify-center">
          <img
            src={statsImage}
            alt="Platform Stats"
            className="w-full max-w-md rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
