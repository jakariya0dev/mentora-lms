import Lottie from "lottie-react";
import { Link } from "react-router";
import notFound from "../assets/404.json";
import HeadTag from "../components/common/HeadTag";

const NotFound = () => {
  return (
    <>
      <HeadTag title="Mentora | Page Not Found" />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
        <div className="text-center">
          <div className="h-56 w-56 mx-auto">
            <Lottie animationData={notFound} loop={true} size={10} />
          </div>
          <p className="text-2xl mt-4 text-gray-600">Page Not Found</p>
          <p className="mt-2 text-gray-500 text-lg">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
