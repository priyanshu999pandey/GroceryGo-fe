
import React from "react";
import { Link, useLocation } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-[78vh] items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border border-green-100 text-center">
        
        {/* Icon Circle */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <span className="text-3xl">✅</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-green-600">
          {location?.state?.text ? location.state.text : "Payment"} Successful
        </h2>

        {/* Message */}
        <p className="mt-2 text-sm text-slate-600">
          Thank you for your order!  
          Your transaction was completed successfully.
        </p>

        {/* Action */}
        <Link
          to="/"
          className="mt-6 inline-block rounded-md border-2 border-green-500 px-6 py-2 font-semibold text-green-600 transition
          hover:bg-green-600 hover:text-white"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
