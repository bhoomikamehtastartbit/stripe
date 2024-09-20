import React from "react";
import PaymentForm from "./PaymentForm";
import { useLocation } from "react-router-dom";
import {
    Elements,
    useStripe,
    useElements,
    CardElement,
  } from "@stripe/react-stripe-js";
  import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Pvv0706O4jzx6iFcPSmE95Qk0GalZJMnsQaqzgdAZtpyHY08oIGRSxL9TvY7kAIXHZBtvY4yufndjjVTvgwC5R700EcLTlzg6"
);
function Payment(props) {
    const location = useLocation();
    console.log(location);

  return (
    <div>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
}

export default Payment;
