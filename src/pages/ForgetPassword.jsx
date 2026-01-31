import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({ 
       email: "",
  });

  const [loading, setLoading] = useState(false);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( !data.email) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    // const loadingToastId = toast.loading("Registering...");

    try {
      const res = await axios.put(
        "https://grocery-go-be.vercel.app/api/user/forgot-password",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
          validateStatus: (s) => s < 500,
        }
      );

      console.log("Response:", res.status, res.data);

      if (res.status === 200 || res.data?.success) {
        toast.success(res.data?.message || "check your email");
        setData({email: ""});
        navigate("/otp-verification",{
          state:data
        })
      } else {
        toast.error(res.data?.message || `failed to otp verification (${res.status})`);
      }
    } catch (error) {
      console.error("Axios error:", error);
      if (error.response) {
        toast.error(error.response.data?.message || `Server error ${error.response.status}`);
      } else if (error.request) {
        toast.error("No response from server");
      } else {
        toast.error("Request error");
      }
    } finally {
    //   toast.dismiss(loadingToastId);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-200 flex items-center justify-center py-8 px-4">
      {/* Card: max width controls layout on large screens, w-full lets it shrink on small screens */}
      <div className="w-full max-w-[450px] bg-white flex flex-col items-center py-6 px-4 sm:px-6 rounded-md shadow">
        <p className="mb-2 text-lg sm:text-xl font-medium text-center">Welcome user, On GroceryGo!!!</p>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
         

          {/* Email */}
          <div className="w-full">
            <label htmlFor="email" className="text-sm">Email:</label>
            <div className="mt-2 w-full px-3 py-2 bg-slate-200 border-2 border-gray-200 focus-within:border-yellow-500 rounded">
              <input
                type="email"
                name="email"
                id="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="focus:outline-none w-full bg-transparent"
              />
            </div>
          </div>


         

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-2 py-2 rounded-lg text-lg text-white tracking-wider ${
              loading ? "bg-green-500 cursor-wait" : "bg-green-800 hover:bg-green-700"
            }`}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
