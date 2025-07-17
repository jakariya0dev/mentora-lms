import { FaEnvelope, FaPhone, FaUser, FaUserShield } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

export default function UserProfile() {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  return (
    <div className="h-full p-10">
      <div className="flex flex-col items-center gap-4 p-6 max-w-2xl mx-auto">
        <img
          src={user.photoURL || user.image || "/default-avatar.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
        />
        <h2 className="text-2xl font-bold">User Profile</h2>

        <div className="w-full mt-2 space-y-3">
          <div className="flex items-center gap-3 mx-10 my-5 px-4 py-4 rounded bg-gray-100 shadow-lg">
            <FaUser className="text-blue-600" />
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {user.displayName || user.name}
            </p>
          </div>
          <div className="flex items-center gap-3 mx-10 my-5 px-4 py-4 rounded bg-gray-100 shadow-lg">
            <FaUserShield className="text-green-600" />
            <p className="capitalize">
              <span className="font-semibold">Role:</span> {user.role || "N/A"}
            </p>
          </div>
          <div className="flex items-center gap-3 mx-10 my-5 px-4 py-4 rounded bg-gray-100 shadow-lg">
            <FaEnvelope className="text-red-600" />
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          </div>
          <div className="flex items-center gap-3 mx-10 my-5 px-4 py-4 rounded bg-gray-100 shadow-lg">
            <FaPhone className="text-purple-600" />
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {user.phone || "Not provided"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
