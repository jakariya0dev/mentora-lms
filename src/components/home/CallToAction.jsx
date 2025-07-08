// CallToAction.jsx
import { Link } from "react-router";

export default function CallToAction() {
  return (
    <section className="bg-indigo-600 py-16 text-white text-center px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to start your learning journey?
        </h2>
        <p className="mb-6 text-lg">
          Join thousands of learners upgrading their skills with Mentora. Start
          today — it's free to explore!
        </p>
        <Link
          to="/courses"
          className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition"
        >
          Browse Courses
        </Link>
      </div>
    </section>
  );
}
