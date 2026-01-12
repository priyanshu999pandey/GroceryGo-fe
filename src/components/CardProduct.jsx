import React from "react";
import { Link } from "react-router-dom";
import ValidUrlConvert from "../utils/ValidUrlConvert";
import AddToCart from "./AddToCartButton";

const CardProduct = ({ data }) => {
  const url = `/product/${ValidUrlConvert(data?.name)}-${ValidUrlConvert(
    data?._id
  )}`;

  return (
    <Link
      to={url}
      className="
        group
        w-40 h-[280px]
        sm:w-44 sm:h-[300px]
        md:w-52 md:h-[330px]
        bg-white rounded-2xl border border-gray-200
        p-2 sm:p-3
        flex flex-col gap-1 sm:gap-2
        shadow-sm hover:shadow-xl
        hover:-translate-y-1 transition-all duration-300
      "
    >
      {/* Image */}
      <div className="h-28 sm:h-32 md:h-36 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
        <img
          src={data.image[0]}
          alt={data.name}
          className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Delivery badge */}
      <div className="w-fit px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full bg-green-100 text-green-700">
        🚀 10 min
      </div>

      {/* Name */}
      <div className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2">
        {data.name}
      </div>

      {/* Unit */}
      <div className="text-[10px] sm:text-xs text-gray-500">{data.unit}</div>

      {/* Price & Button */}
      <div className="mt-auto flex items-center justify-between">
        <div className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
          ₹{data.price}
          <span className="text-xs sm:text-sm font-medium">.00</span>
        </div>

        <AddToCart data={data} />
      </div>
    </Link>
  );
};

export default CardProduct;
