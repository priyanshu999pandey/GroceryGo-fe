

import React from "react";
import { Link } from "react-router-dom";

const OrderCancel = () => {
  return (
    <div className="flex min-h-[78vh] items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border border-red-100 text-center">
        {/* Icon Circle */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <span className="text-3xl">❌</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-red-600">
          Order Unsuccessful
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm text-slate-600">
          Something went wrong while placing your order.  
          Please try again or choose another payment method.
        </p>

        {/* Action */}
        <Link
          to="/"
          className="mt-6 inline-block rounded-md border-2 border-red-500 px-6 py-2 font-semibold text-red-600 transition
          hover:bg-red-600 hover:text-white"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderCancel;
