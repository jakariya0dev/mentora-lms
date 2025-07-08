import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaImage, FaLock, FaMailBulk, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import GoogleLogo from "../assets/icons/google.svg";
import { AuthContext } from "../providers/AuthProvider";

const errorMap = {
  "auth/invalid-email": "Invalid email address.",
  "auth/email-already-in-use": "Email already in use.",
  "auth/weak-password": "Password should be at least 6 characters long.",
  "auth/too-many-requests": "Too many attempts. Try again later.",
};

export default function Signup() {
  const navigate = useNavigate();

  const { userSignup, loginWithGoogle, setUser, updateUserProfile } =
    useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signupMutation = useMutation({
    mutationFn: async (data) => {
      const userCredential = await userSignup(data.email, data.password);
      await updateUserProfile(userCredential.user, data.name, data.photoURL);
      return userCredential.user;
    },
    onSuccess: (user) => {
      setUser(user);
      navigate("/login");
      console.log(user);
    },
    onError: (error) => {
      console.log(error);
      alert(error.response?.data?.message || "Signup failed");
    },
  });

  const googleLoginMutation = useMutation({
    mutationFn: async () => {
      const userCredential = await loginWithGoogle();
      return userCredential.user;
    },
    onSuccess: (user) => {
      setUser(user);
      toast.success("Login successful!");
      navigate("/");
    },
    onError: (error) => {
      const message = errorMap[error.code] || "Login failed.";
      toast.error(message);
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    signupMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Name
            </label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name"
                className="w-full outline-none"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaMailBulk className="text-gray-400 mr-2" />
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
            <div className="flex items-center border rounded-md px-3 py-2">
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

          {/* Photo URL */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Photo URL
            </label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaImage className="text-gray-400 mr-2" />
              <input
                type="url"
                {...register("photoURL", { required: "Photo URL is required" })}
                placeholder="Enter your photo URL"
                className="w-full outline-none"
              />
            </div>
            {errors.photoURL && (
              <p className="text-red-500 text-sm mt-1">
                {errors.photoURL.message}
              </p>
            )}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
            disabled={signupMutation.isLoading}
            onClick={() => signupMutation.mutate()}
          >
            {signupMutation.isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-semibold"
          >
            Log in
          </Link>
        </p>

        <div className="divider">OR</div>
        {/* Google Login Button */}
        <button
          className="w-full border text-gray-600 border-gray-400 py-2 rounded-md hover:shadow-lg transition duration-300"
          disabled={googleLoginMutation.isLoading}
          onClick={() => googleLoginMutation.mutate()}
        >
          {googleLoginMutation.isLoading ? (
            "Signing..."
          ) : (
            <span className="flex items-center justify-center font-semibold">
              <img
                src={GoogleLogo}
                alt="Google Logo"
                className="w-6 h-6 mr-2"
              />
              Signup with Google
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
