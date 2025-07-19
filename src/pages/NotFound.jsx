import { Link } from "react-router";
import HeadTag from "../components/common/HeadTag";

const NotFound = () => {
  return (
    <>
      <HeadTag title="Mentora | Page Not Found" />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800">404</h1>
          <p className="text-2xl mt-4 text-gray-600">Page Not Found</p>
          <p className="mt-2 text-gray-500">
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
