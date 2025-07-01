import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-100 to-lime-200 px-4">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md">
        <div className="flex justify-center mb-4">
          <FaLock className="text-red-500 text-6xl" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-3">403 Forbidden</h1>
        <p className="text-gray-600 mb-6">
          Oops! You don't have permission to access this page.
        </p>

        <Link
          to="/"
          className="inline-block bg-lime-500 hover:bg-lime-600 text-white px-6 py-2 rounded-full font-semibold transition"
        >
          🔙 Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
