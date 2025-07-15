import { FaChalkboardTeacher, FaGlobe, FaMoneyBillWave } from "react-icons/fa";
import { Link } from "react-router";
import teacherImg from "../../assets/images/banner.jpg";

export default function JoinAsTeacher() {
  return (
    <section className="bg-gray-100 py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left - Image */}
        <div>
          <img
            src={teacherImg}
            alt="Inspire as a teacher"
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>

        {/* Right - Content */}
        <div>
          <h2 className="text-4xl font-bold text-gray-600 mb-5">
            Share Your Knowledge
          </h2>
          <p className="text-gray-500 mb-5 text-lg text-justify">
            Join thousands of passionate educators who are empowering the next
            generation of developers, designers, and freelancers. Whether you're
            an expert in tech, design, or freelancing.
          </p>

          <div className="space-y-3 mb-8">
            <div className="flex items-center space-x-4">
              <FaChalkboardTeacher className="text-indigo-600 text-2xl" />
              <span className="text-gray-500">Teach at your own pace</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaMoneyBillWave className="text-green-600 text-2xl" />
              <span className="text-gray-500">Earn while you teach</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaGlobe className="text-blue-600 text-2xl" />
              <span className="text-gray-500">Impact learners worldwide</span>
            </div>
          </div>

          <Link
            to="/become-teacher"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition duration-200"
          >
            Become a Teacher
          </Link>
        </div>
      </div>
    </section>
  );
}
