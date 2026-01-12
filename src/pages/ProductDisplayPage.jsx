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
    price: 0,
    stock: 0,
    unit: "",
    discount: 0,
    description: "",
    more_details: {},
  });
  const [image, setImage] = useState(0);

  const params = useParams();
  const productId = params.product?.split("-").slice(-1)[0];

  const handleLeftScroll = () => (containerScroll.current.scrollLeft -= 140);
  const handleRightScroll = () => (containerScroll.current.scrollLeft += 140);

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
      toast.error(error?.response?.data?.message || error?.message || "Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchProductdetail();
  }, [productId]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 md:px-10 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT IMAGE SECTION */}
        <div className="space-y-6">
          <div className="relative bg-white rounded-[2rem] shadow-2xl p-6 overflow-hidden transition hover:shadow-3xl">
            <img
              src={data.image[image]}
              alt={data.name}
              className="h-[55vh] w-full object-contain transition-transform duration-500 hover:scale-110"
            />
            {data.discount > 0 && (
              <span className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                {data.discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          <div className="relative">
            <div ref={containerScroll} className="flex gap-4 overflow-x-auto scrollbar-hide p-2">
              {data.image.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  onClick={() => setImage(idx)}
                  className={`h-20 w-20 object-contain rounded-xl cursor-pointer border-2 transition-all hover:scale-105 ${
                    image === idx ? "border-green-500 shadow-lg" : "border-gray-200"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleLeftScroll}
              className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={handleRightScroll}
              className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50"
            >
              <FaArrowRight />
            </button>
          </div>

          {/* Description Card */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed text-sm">{data.description}</p>
          </div>

          {Object.keys(data.more_details || {}).map((key, idx) => (
            <div key={idx} className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-lg font-semibold mb-2">{key}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{data.more_details[key]}</p>
            </div>
          ))}
        </div>

        {/* RIGHT INFO SECTION */}
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold shadow">
            🚀 10 Min Delivery
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">{data.name}</h1>
          <p className="text-gray-500 text-sm">{data.unit}</p>

          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4" />

          <div className="flex items-center gap-4 flex-wrap">
            <p className="text-3xl font-extrabold text-gray-900">
              ₹{priceWithDiscount(data.price, data.discount)}.00
            </p>

            {data.discount > 0 && (
              <p className="line-through text-gray-400 text-lg">₹{data.price}.00</p>
            )}
          </div>

          <AddToCartButton data={data} />

          {/* Feature Cards */}
          <div className="pt-8">
            <h2 className="text-2xl font-bold mb-5">Why shop from GroceryGo?</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[{
                img: minute_delivery,
                title: "Superfast Delivery",
                desc: "Delivered from nearby stores in minutes.",
              },
              {
                img: Best_Prices_Offers,
                title: "Best Prices",
                desc: "Top offers directly from brands.",
              },
              {
                img: Wide_Assortment,
                title: "Wide Assortment",
                desc: "5000+ products across categories.",
              }].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-5 shadow-xl flex gap-4 items-center transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  <img src={item.img} alt="feature" className="h-14 w-14 object-contain" />
                  <div>
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;