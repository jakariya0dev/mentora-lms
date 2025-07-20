// CallToAction.jsx
import { Link } from "react-router";
import bgImage from "../../assets/images/c2a.jpg";

export default function CallToAction() {
  return (
    <section
      className="relative bg-cover bg-center py-32 px-6 text-white text-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-md">
          Ready to Transform Your Learning?
        </h2>

        <p className="mb-8 text-lg md:text-xl text-gray-200 drop-shadow-sm">
          Join thousands leveling up their careers with Mentora — start for free
          and explore the future of learning.
        </p>
        <Link
          to="/courses"
          className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300"
        >
          Browse Courses
        </Link>
      </div>
    </section>
  );
}
