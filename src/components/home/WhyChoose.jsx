import { FaCertificate, FaClock, FaUserFriends, FaVideo } from "react-icons/fa";

export default function WhyChoose() {
  return (
    <section className="bg-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Why Choose <span className="text-indigo-600">Mentora?</span>
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Thousands of learners love Mentora because it offers quality content,
          skilled mentors, and practical learning tools to boost your career.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Interactive Video Courses */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaVideo className="text-4xl text-indigo-600 mx-auto mb-4" />
            <h4 className="font-bold text-lg mb-2">
              Interactive Video Courses
            </h4>
            <p className="text-gray-600 text-sm">
              Engage with high-quality videos, quizzes, and projects that help
              you apply what you learn.
            </p>
          </div>

          {/* 2. Verified Certificates */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaCertificate className="text-4xl text-indigo-600 mx-auto mb-4" />
            <h4 className="font-bold text-lg mb-2">Verified Certificates</h4>
            <p className="text-gray-600 text-sm">
              Earn recognized certificates to showcase your new skills and boost
              your resume.
            </p>
          </div>

          {/* 3. Mentor Support */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaUserFriends className="text-4xl text-indigo-600 mx-auto mb-4" />
            <h4 className="font-bold text-lg mb-2">1-on-1 Mentor Support</h4>
            <p className="text-gray-600 text-sm">
              Get personalized feedback and career advice directly from industry
              experts.
            </p>
          </div>

          {/* 4. Learn Anytime */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <FaClock className="text-4xl text-indigo-600 mx-auto mb-4" />
            <h4 className="font-bold text-lg mb-2">Flexible Learning</h4>
            <p className="text-gray-600 text-sm">
              Access your courses anytime, anywhere — perfect for busy
              professionals and freelancers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
