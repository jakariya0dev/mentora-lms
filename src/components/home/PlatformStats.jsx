import statsImage from "../../assets/images/banner.jpg"; // replace with your relevant image path

export default function PlatformStats() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side - Cards */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Unlock Your Potential with <span className="text-indigo-600">Mentora</span>
          </h2>
          <p className="text-gray-600 mb-6">
            AI powered learning platform for tech, design, freelancing, and more.
          </p>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h3 className="text-4xl font-bold text-gray-800">12,450+</h3>
              <p className="font-semibold text-gray-500">Total Users</p>
            </div>
            <div className="w-0.5 h-16 bg-gray-300"></div>
            <div className="flex flex-col">
              <h3 className="text-4xl font-bold text-gray-800">321+</h3>
              <p className="font-semibold text-gray-500">Courses</p>
            </div>
            <div className="w-0.5 h-16 bg-gray-300"></div>
            <div className="flex flex-col">
              <h3 className="text-4xl font-bold text-gray-800">55,000+</h3>
              <p className="font-semibold text-gray-500">Total Enrollments</p>
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
