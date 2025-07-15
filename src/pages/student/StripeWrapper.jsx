import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";
import LoaderDotted from "../../components/common/LoaderDotted";
import useAuth from "../../hooks/useAuth";
import StripeCheckoutForm from "./StripeCheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripeWrapper = () => {
  const { user } = useAuth();
  const { id } = useParams();

  const { data: courseDetails } = useQuery({
    queryKey: ["courseDetails", user?.email, id],
    queryFn: async () => {
      if (!user?.email) return null;
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/courses/${id}`
      );

      return response.data.course;
    },
  });

  if (!courseDetails) return <LoaderDotted />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800 text-center">
          Checkout
        </h2>
        <hr className="mb-8" />
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 ">
          {/* Left - User Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Payment Account
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Name:</strong> {user?.displayName || "Guest User"}
              </p>
              <p>
                <strong>Email:</strong> {user?.email || "Not provided"}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Selected Course
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {courseDetails?.title}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Return Policy
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                All course purchases are final. You may request a refund within
                7 days if you haven't accessed more than 10% of the content. For
                detailed terms, visit our refund policy page.
              </p>
            </div>
          </div>

          {/* Right - Order Summary */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Order Summary
            </h2>
            <div className="border border-gray-400 rounded-lg p-6 bg-gray-50 text-gray-700 space-y-4">
              <div className="flex justify-between">
                <span>Amount</span>
                <span>
                  ${Number(courseDetails?.price).toFixed(2) || "0.00"}
                </span>
              </div>
              <div className="border-t pt-4 flex justify-between font-semibold text-gray-900">
                <span>Total</span>
                <span>
                  ${Number(courseDetails?.price).toFixed(2) || "0.00"}
                </span>
              </div>
              <Elements stripe={stripePromise}>
                <StripeCheckoutForm courseDetails={courseDetails} />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeWrapper;
