import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";

const Register = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Password and confirm password don't match!");
      return;
    }

    setLoading(true);
    const loadingToastId = toast.loading("Registering...");

    try {
      const res = await Axios.post(
        "/user/register",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
          validateStatus: (s) => s < 500,
        }
      );

      console.log("Response:", res.status, res.data);

      if (res.status === 201 || res.data?.success) {
        toast.success(res.data?.message || "Registered successfully!");
        setData({ name: "", email: "", password: "", confirmPassword: "" });
        navigate("/login")
      } else {
        toast.error(res.data?.message || `Registration failed (${res.status})`);
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
      toast.dismiss(loadingToastId);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-200 flex items-center justify-center py-8 px-4">
      {/* Card: max width controls layout on large screens, w-full lets it shrink on small screens */}
      <div className="w-full max-w-[450px] bg-white flex flex-col items-center py-6 px-4 sm:px-6 rounded-md shadow">
        <p className="mb-2 text-lg sm:text-xl font-medium text-center">Welcome user, On GroceryGo!!!</p>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="w-full">
            <label htmlFor="name" className="text-sm">Name:</label>
            <div className="mt-2 w-full px-3 py-2 bg-slate-200 border-2 border-gray-200 focus-within:border-yellow-500 rounded">
              <input
                type="text"
                name="name"
                id="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter your name"
                autoFocus
                className="focus:outline-none w-full bg-transparent"
              />
            </div>
          </div>

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

          {/* Password */}
          <div className="w-full">
            <label htmlFor="password" className="text-sm">Password:</label>
            <div className="mt-2 w-full px-3 py-2 bg-slate-200 border-2 border-gray-200 focus-within:border-yellow-500 rounded flex items-center">
              <input
                type={showPass1 ? "text" : "password"}
                name="password"
                id="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="focus:outline-none w-full bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPass1((s) => !s)}
                className="ml-2 p-1 rounded hover:bg-slate-300"
                aria-label={showPass1 ? "Hide password" : "Show password"}
              >
                {showPass1 ? <FiEye size={18} /> : <FiEyeOff size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="w-full">
            <label htmlFor="cpass" className="text-sm">Confirm password:</label>
            <div className="mt-2 w-full px-3 py-2 bg-slate-200 border-2 border-gray-200 focus-within:border-yellow-500 rounded flex items-center">
              <input
                type={showPass2 ? "text" : "password"}
                name="confirmPassword"
                id="cpass"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="focus:outline-none w-full bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPass2((s) => !s)}
                className="ml-2 p-1 rounded hover:bg-slate-300"
                aria-label={showPass2 ? "Hide password" : "Show password"}
              >
                {showPass2 ? <FiEye size={18} /> : <FiEyeOff size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-2 py-2 rounded-lg text-lg text-white tracking-wider ${
              loading ? "bg-green-500 cursor-wait" : "bg-green-800 hover:bg-green-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="text-sm sm:text-base text-center mt-4 text-gray-600">
  Already have an account?{" "}
  <a
    href="/login"
    className="text-green-700 hover:text-green-800 font-medium"
  >
    Login
  </a>
</p>
        </form>
      </div>
    </div>
  );
};

export default Register;
