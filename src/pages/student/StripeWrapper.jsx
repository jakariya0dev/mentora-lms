import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import StripeCheckoutForm from "./StripeCheckoutForm";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripeWrapper = () => {

    const { user } = useAuth();
    const { id } = useParams();

      const { data: courseDetails } = useQuery({
        queryKey: ["courseDetails", user?.email],
        queryFn: async () => {
          if (!user?.email) return null;
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/courses/${id}`
          );
          console.log("Course Details:", response.data);
    
          return response.data;
        },
      });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl mb-4 font-semibold">Checkout</h2>
      <Elements stripe={stripePromise}>
        <StripeCheckoutForm courseDetails={courseDetails} />
      </Elements>
    </div>
  );
};

export default StripeWrapper;
