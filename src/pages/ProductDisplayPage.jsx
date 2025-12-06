import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Axios from "../utils/Axios";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import minute_delivery from "../assets/minute_delivery.png";
import Best_Prices_Offers from "../assets/Best_Prices_Offers.png";
import Wide_Assortment from "../assets/Wide_Assortments.png";
import { priceWithDiscount } from "../utils/Discount";
import AddToCartButton from "../components/AddToCartButton";

const ProductDisplayPage = () => {
  const containerScroll = useRef();
  const [data, setData] = useState({
    name: "",
    image: [],
    price: null,
    stock: null,
    unit: null,
    discount: 0,
    description: "",
    more_details: {},
  });
  const [image, setImage] = useState(0);

  const params = useParams();
  const productId = params.product?.split("-").slice(-1)[0];

  const handleLeftScroll = () => containerScroll.current.scrollLeft -= 100;
  const handleRightScroll = () => containerScroll.current.scrollLeft += 100;

  const fetchProductdetail = async () => {
    if (!productId) return;
    try {
      const res = await Axios.post("/product/get-productDetailById", { productId });
      const prod = res?.data?.data;
      setData({
        name: prod?.name || "",
        image: prod?.image || [],
        price: prod?.price || 0,
        stock: prod?.stock || 0,
        unit: prod?.unit || "",
        discount: prod?.discount || 0,
        description: prod?.description || "",
        more_details: prod?.more_details || {},
        _id: prod?._id,
      });
    } catch (error) {
      console.error("fetchProductdetail error:", error);
      toast.error(error?.response?.data?.message || error?.message || "Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchProductdetail();
  }, [productId]);

  return (
    <section className="flex flex-col lg:flex-row w-full bg-white px-4 py-6 gap-6">
      {/* LEFT: Product Images */}
      <div className="w-full lg:w-[40%] flex flex-col items-center gap-4">
        {/* Main Image */}
        <div className="h-[40vh] lg:h-[60vh] w-full bg-gray-50 rounded-md shadow-inner flex justify-center items-center overflow-hidden">
          <img src={data.image[image]} alt={data.name} className=" scale-75  h-full w-full" />
        </div>

        {/* Thumbnail indicators */}
        <div className="flex gap-3">
          {data.image.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                image === idx ? "bg-green-600" : "bg-gray-300"
              }`}
              onClick={() => setImage(idx)}
            ></div>
          ))}
        </div>

        {/* Horizontal thumbnail scroll */}
        {data.image.length > 1 && (
          <div className="relative w-full flex items-center">
            <div
              ref={containerScroll}
              className="flex gap-3 overflow-x-auto scrollbar-hide p-2 scroll-smooth"
            >
              {data.image.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={data.name}
                  className="h-20 w-20 object-contain rounded-md cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setImage(idx)}
                />
              ))}
            </div>

            <button
              onClick={handleLeftScroll}
              className="hidden lg:flex absolute left-0 p-2 bg-white shadow rounded-full"
            >
              <FaArrowLeft size={18} />
            </button>
            <button
              onClick={handleRightScroll}
              className="hidden lg:flex absolute right-0 p-2 bg-white shadow rounded-full"
            >
              <FaArrowRight size={18} />
            </button>
          </div>
        )}

        {/* Product Description */}
        <div className="w-full bg-gray-50 p-4 rounded-md shadow-inner mt-2">
          <h3 className="font-semibold mb-1">Description</h3>
          <p className="text-sm text-gray-600">{data.description}</p>
        </div>

        {/* More Details */}
        {data?.more_details &&
          Object.keys(data?.more_details).map((key, idx) => (
            <div key={idx} className="w-full bg-gray-50 p-4 rounded-md shadow-inner mt-2">
              <h3 className="font-semibold mb-1">{key}</h3>
              <p className="text-sm text-gray-600">{data?.more_details[key]}</p>
            </div>
          ))}
      </div>

      {/* RIGHT: Product Info */}
      <div className="w-full lg:w-[60%] flex flex-col gap-4 bg-green-50 p-6 rounded-md shadow-inner">
        <p className="inline-block bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm w-fit">
          10 Min Delivery
        </p>
        <h1 className="text-3xl lg:text-4xl font-bold">{data.name}</h1>
        <p className="text-md">{data.unit}</p>

        <div className="border-b border-gray-300 my-4"></div>

        {/* Price & Discount */}
        <div className="flex items-center gap-4">
          <p className="text-lg font-semibold px-4 py-2 border border-gray-400 rounded">
            ₹{priceWithDiscount(data.price, data.discount)}.00
          </p>
          {data.discount > 0 && (
            <p className="line-through text-gray-400">₹{data.price}.00</p>
          )}
          {data.discount > 0 && (
            <p className="text-green-800 font-semibold">{data.discount}% Off</p>
          )}
        </div>

        <AddToCartButton data={data} />

        {/* Features */}
        <div className="mt-8">
          <h2 className="font-semibold text-lg mb-3">Why shop from GroceryGo?</h2>
          <div className="flex flex-col gap-3">
            <div className="flex p-4 border border-gray-300 rounded gap-4 items-center">
              <img src={minute_delivery} alt="Fast Delivery" className="h-16 w-16 object-contain" />
              <div>
                <h4 className="font-medium">Superfast Delivery</h4>
                <p className="text-sm text-gray-500">
                  Get your order delivered to your doorstep at the earliest from dark stores near you.
                </p>
              </div>
            </div>
            <div className="flex p-4 border border-gray-300 rounded gap-4 items-center">
              <img src={Best_Prices_Offers} alt="Best Prices" className="h-16 w-16 object-contain" />
              <div>
                <h4 className="font-medium">Best Prices & Offers</h4>
                <p className="text-sm text-gray-500">
                  Best price destination with offers directly from the manufacturers.
                </p>
              </div>
            </div>
            <div className="flex p-4 border border-gray-300 rounded gap-4 items-center">
              <img src={Wide_Assortment} alt="Wide Assortment" className="h-16 w-16 object-contain" />
              <div>
                <h4 className="font-medium">Wide Assortment</h4>
                <p className="text-sm text-gray-500">
                  Choose from 5000+ products across food, personal care, household & other categories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
