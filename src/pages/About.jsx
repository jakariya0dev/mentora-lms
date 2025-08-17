// About.jsx
import teamImage from "../assets/images/banner.jpg";
import learningImage from "../assets/images/c2a.jpg";
import contactImage from "../assets/images/teacher.jpg";

export default function About() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-32 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          About Mentor
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md">
          Empowering learners worldwide to achieve their dreams with flexible,
          interactive, and high-quality online courses. Mentor is your trusted
          platform to grow, learn, and succeed.
        </p>
      </section>

      {/* Who We Are */}
      <section className="max-w-6xl mx-auto px-6 md:flex md:items-center md:gap-12">
        <div className="md:w-1/2">
          <img
            src={teamImage}
            alt="Our Team"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <h2 className="text-3xl font-bold mb-4 text-indigo-700">
            Who We Are
          </h2>
          <p className="text-gray-700 mb-4">
            Mentor is a forward-thinking online learning platform designed for
            learners of all backgrounds. We are a team of passionate educators,
            developers, and learning specialists committed to bridging the gap
            between knowledge and practical skills. Our mission is to provide
            high-quality, accessible education to anyone, anywhere.
          </p>
          <p className="text-gray-700">
            With years of experience in both traditional education and modern
            technology, our team ensures that every course is carefully crafted
            to deliver real-world value, personalized learning experiences, and
            interactive engagement.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center md:text-left md:flex md:gap-12 md:items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-indigo-700">
              What We Do
            </h2>
            <p className="text-gray-700 mb-4">
              At Mentor, we offer a comprehensive learning ecosystem where
              students, teachers, and administrators can seamlessly interact.
              From enrolling in courses to tracking progress, submitting
              assignments, and receiving certifications, everything is designed
              to enhance the learning journey.
            </p>
            <p className="text-gray-700">
              Our platform supports interactive classes, assignments, quizzes,
              and feedback mechanisms, ensuring learners not only consume
              content but actively engage with it. Teachers can create, manage,
              and monitor courses, while admins oversee platform integrity and
              quality control.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src={learningImage}
              alt="Learning"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-indigo-700 text-center">
          How Mentor Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2 text-indigo-600">
              Sign Up & Explore
            </h3>
            <p className="text-gray-700">
              Create your free account to access the Mentor platform. Browse
              through a wide range of courses across various domains and skill
              levels.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2 text-indigo-600">
              Enroll & Learn
            </h3>
            <p className="text-gray-700">
              Enroll in courses that fit your learning goals. Engage with
              lessons, complete assignments, participate in discussions, and
              track your progress with interactive dashboards.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl mb-2 text-indigo-600">
              Get Certified & Grow
            </h3>
            <p className="text-gray-700">
              Successfully complete courses and receive certificates to showcase
              your skills. Leverage your learning achievements to advance your
              career or personal development.
            </p>
          </div>
        </div>
      </section>

      {/* Contact & Queries */}
      <section className="bg-gray-700 py-16 px-6 text-white">
        <div className="max-w-7xl mx-auto text-center md:flex md:items-center md:gap-12">
          <div className="md:w-1/2">
            <img
              src={contactImage}
              alt="Contact"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 text-left">
            <h2 className="text-3xl font-bold mb-4 text-white">Contact Us</h2>
            <p className="text-gray-200 mb-4">
              Have questions, feedback, or suggestions? We’d love to hear from
              you! Reach out to us via the following channels:
            </p>
            <ul className="text-gray-200 space-y-2 list-disc list-inside">
              <li>Email: support@mentor.com</li>
              <li>Phone: +880 123 456 789</li>
              <li>Live Chat: Available 9AM - 6PM (GMT+6)</li>
              <li>Feedback Form: Accessible within the platform</li>
            </ul>
            <p className="text-gray-200 mt-4">
              Our team is committed to assisting you promptly and ensuring your
              learning journey is smooth and rewarding.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
