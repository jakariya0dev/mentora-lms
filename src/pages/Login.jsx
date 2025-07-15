import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaLock, FaUser } from "react-icons/fa";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import GoogleLogo from "../assets/icons/google.svg";
import LoaderDotted from "../components/common/LoaderDotted";
import useAuth from "../hooks/useAuth";

const errorMap = {
  "auth/invalid-email": "Invalid email address.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password.",
  "auth/too-many-requests": "Too many attempts. Try again later.",
};

export default function Login() {
  const { user, setUser, isUserLoading, userLogin, loginWithGoogle } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const userCredential = await userLogin(data.email, data.password);
      return userCredential.user;
    },
    onSuccess: async (user) => {
      setUser(user);
      toast.success("Login successful!");
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      const message = errorMap[error.code] || "Login failed.";
      toast.error(message);
      console.log(error);
    },
  });

  const googleLoginMutation = useMutation({
    mutationFn: async () => {
      const userCredential = await loginWithGoogle();
      return userCredential.user;
    },
    onSuccess: async (user) => {
      // Save user in database on MongoDB
      await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "student",
      });

      setUser(user);
      toast.success("Login successful!");
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      const message = errorMap[error.code] || "Login failed.";
      toast.error(message);
      console.log(error);
    },
  });

  if (isUserLoading) return <LoaderDotted />;

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-600 mb-6">
          Welcome Back to
        </h2>

        <form onSubmit={handleSubmit(loginMutation.mutate)}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center border-2 border-gray-300 rounded-md px-3 py-2">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email"
                className="w-full outline-none"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center border-2 border-gray-300 rounded-md px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Enter your password"
                className="w-full outline-none"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            state={{ from: location.state?.from || "/" }}
            className="text-indigo-600 hover:underline font-semibold"
          >
            Register here
          </Link>
        </p>

        <div className="divider">OR</div>

        {/* Google Login Button */}
        <button
          className="w-full border text-gray-600 border-gray-400 py-2 rounded-md hover:shadow-lg transition duration-300"
          disabled={googleLoginMutation.isPending}
          onClick={() => googleLoginMutation.mutate()}
        >
          {
            <span className="flex items-center justify-center font-semibold">
              <img
                src={GoogleLogo}
                alt="Google Logo"
                className="w-6 h-6 mr-2"
              />
              {googleLoginMutation.isPending
                ? "Logging with Google..."
                : "Login with Google"}
            </span>
          }
        </button>
      </div>
    </div>
  );
}
