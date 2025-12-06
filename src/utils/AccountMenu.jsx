import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Axios from './Axios'
import { clearUser } from '../store/userSlice'
import { FiExternalLink, FiLogOut } from "react-icons/fi";
import toast from 'react-hot-toast'

const AccountMenu = ({ setIsOpenMenu }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.user)

  useEffect(() => {}, [])

  const handleLogout = async () => {
    try {
      await Axios.post("/user/logout", {});
      dispatch(clearUser());
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      toast.success("Logged out successfully!");
      navigate("/login");
      setIsOpenMenu && setIsOpenMenu(false)
    } catch (error) {
      toast.error("Logout failed!");
      console.error("Logout error:", error);
    }
  }

  return (
    <div className="w-64 rounded-3xl bg-white/70 backdrop-blur-md border border-gray-200 shadow-xl p-5 text-gray-800 flex flex-col gap-4">
      
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-green-600 to-green-800 text-white font-extrabold text-xl shadow-lg">
          { user?.name ? user.name.charAt(0).toUpperCase() : "U" }
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{user?.name || "User"}</p>
          <p className="text-xs text-gray-500 truncate">{user?.email || "No email"}</p>
        </div>
        <Link
          to={"/dashboard/profile"}
          onClick={() => setIsOpenMenu && setIsOpenMenu(false)}
          className="p-2 rounded-md hover:bg-amber-400/20 transition-all"
          aria-label="Open profile"
        >
          <FiExternalLink className="w-5 h-5 text-amber-500"/>
        </Link>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-3">
        <Link
          to={"/dashboard/profile"}
          onClick={() => setIsOpenMenu && setIsOpenMenu(false)}
          className="flex items-center justify-between px-4 py-2 text-sm rounded-xl hover:bg-green-50 hover:translate-x-1 transition-all"
        >
          <span className="text-gray-700 font-medium">View Profile</span>
          <FiExternalLink className="w-4 h-4 text-gray-400"/>
        </Link>

        <Link
          to={"/dashboard/my-orders"}
          onClick={() => setIsOpenMenu && setIsOpenMenu(false)}
          className="px-4 py-2 text-sm rounded-xl text-gray-700 hover:bg-amber-500 hover:text-white transition-all hover:translate-x-1"
        >
          My Orders
        </Link>

        <Link
          to={"/dashboard/address"}
          onClick={() => setIsOpenMenu && setIsOpenMenu(false)}
          className="px-4 py-2 text-sm rounded-xl text-gray-700 hover:bg-amber-500 hover:text-white transition-all hover:translate-x-1"
        >
          Saved Addresses
        </Link>
      </div>

      {/* Footer / Logout */}
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold hover:scale-105 transition-transform shadow-md"
        >
          <FiLogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  )
}

export default AccountMenu
