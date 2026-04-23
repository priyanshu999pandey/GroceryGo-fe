import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import ValidUrlConvert from "../utils/ValidUrlConvert";

const CategoryWiseProductDisplay = ({ id, name }) => {
  const navigate = useNavigate();
  const scrollRef = useRef();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCatgoryWiseProduct = async () => {
    try {
      setLoading(true);
      const res = await Axios.post("/product/get-productByCategory", { id });
      setData(res?.data?.data || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatgoryWiseProduct();
  }, [id]);

  const handleScrollRight = () => {
    scrollRef.current.scrollLeft += 400;
  };

  const handleScrollLeft = () => {
    scrollRef.current.scrollLeft -= 400;
  };

  const loadingCardNo = new Array(7).fill(null);
  const shimmerCards = new Array(12).fill(null);

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold lg:text-xl text-gray-800">{name}</h3>
        {!loading && data.length > 0 && (
          <Link
            to={`/${ValidUrlConvert(name)}-${id}`}
            className="text-green-600 hover:text-green-400 transition-colors"
          >
            See All
          </Link>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center gap-2 md:gap-4 lg:gap-6 overflow-x-auto p-4 scrollbar-hide">
          {loadingCardNo.map((card, index) => (
            <CardLoading key={index + "card"} />
          ))}
        </div>
      )}

      {/* No Data State with Shimmer Effect */}
      {!loading && data.length === 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
          {shimmerCards.map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              {/* Image Shimmer */}
              <div className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
              
              {/* Content Shimmer */}
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-3/4"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-1/2"></div>
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-2/3"></div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-1/3"></div>
                  <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Data Display */}
      {!loading && data.length > 0 && (
        <div className="relative group">
          <div
            className="flex items-center gap-2 md:gap-4 lg:gap-6 overflow-x-auto p-4 scrollbar-hide scroll-smooth"
            ref={scrollRef}
          >
            {data.map((p, index) => (
              <div key={index} className="flex-shrink-0">
                <CardProduct data={p} />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {data.length > 3 && (
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-2 pointer-events-none">
              <button
                className="bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 pointer-events-auto opacity-0 group-hover:opacity-100"
                onClick={handleScrollLeft}
              >
                <GoTriangleLeft size={30} className="text-gray-700" />
              </button>
              <button
                className="bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 pointer-events-auto opacity-0 group-hover:opacity-100"
                onClick={handleScrollRight}
              >
                <GoTriangleRight size={30} className="text-gray-700" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryWiseProductDisplay;