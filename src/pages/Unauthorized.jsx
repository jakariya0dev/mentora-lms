import { Link } from "react-router";
import HeadTag from "../components/common/HeadTag";

const Unauthorized = () => {
  return (
    <>
      <HeadTag title="Mentora | Unauthorized" />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">403</h1>
          <h2 className="text-2xl font-semibold mb-2">Unauthorized Access</h2>
          <p className="text-gray-600 mb-6">
            Sorry, you don't have permission to view this page.
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;
