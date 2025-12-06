

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "./Axios";
import { clearUser } from "../store/userSlice";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";

const AccountMenuMobile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.user);

  const handleLogout = async () => {
    try {
      await Axios.post("/user/logout", {});
      dispatch(clearUser());
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed!");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="w-full h-[78vh] shadow-lg p-5 bg-white flex flex-col gap-4 rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
        <div>
          <p className="text-lg font-semibold">{user?.name || "User"}</p>
          <p className="text-sm text-gray-500">{user?.email || "No email"}</p>
        </div>
        <RxCross1
          className="text-2xl cursor-pointer text-gray-600 hover:text-red-500 transition-colors"
          onClick={() => window.history.back()}
        />
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-3 mt-4">
        <button
          onClick={() => navigate("/dashboard/my-orders")}
          className="w-full text-left px-4 py-3 rounded-lg hover:bg-amber-500 hover:text-white text-gray-700 font-medium transition-all shadow-sm"
        >
          My Orders
        </button>

        <button
          onClick={() => navigate("/dashboard/address")}
          className="w-full text-left px-4 py-3 rounded-lg hover:bg-amber-500 hover:text-white text-gray-700 font-medium transition-all shadow-sm"
        >
          Saved Addresses
        </button>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold shadow-md hover:scale-105 transition-transform"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountMenuMobile;
