import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Axios from './Axios'
import { clearUser } from '../store/userSlice'
import { FiExternalLink } from "react-icons/fi";
import toast from 'react-hot-toast'

const AccountMenu = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state?.user)
    useEffect(()=>{})
    // console.log(user)

    const handleLogout = async()=>{
        try {
            await Axios.post("/user/logout", {});
            dispatch(clearUser());
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            toast.success("Logged out successfully!");
            navigate("/login"); // ✅ redirect to login
        } catch (error) {
            toast.error("Logout failed!");
            console.error("Logout error:", error);
        }
    }

  return (
    <div className='w-40 shadow-lg p-5 bg-white flex flex-col justify-center items-start  ' >
    <div className='border-b border-gray-500  px-2  ' >  
        <p className='font-semibold '>My Account</p>
          <div className='flex gap-2' >
             <p className='text-sm text-gray-500 mb-2' >{user?.name}</p>
            <Link to={"/dashboard/profile"} onClick={()=>props?.setIsOpenMenu(false)} className='hover:text-yellow-500' > <FiExternalLink /></Link>
          </div>
    </div>

    <Link to={"/dashboard/my-orders"} onClick={()=>props?.setIsOpenMenu(false)} className=' text-sm  text-gray-500 py-1 hover:bg-amber-500 rounded-sm w-full mt-1 px-2 hover:text-white ' >My orders</Link>
    <Link to={"/dashboard/address"} onClick={()=>props?.setIsOpenMenu(false)} className=' text-sm  text-gray-500 py-1 hover:bg-amber-500 rounded-sm w-full mt-1 px-2 hover:text-white ' >Save address</Link>
    <Link  className=' text-sm  text-gray-500 py-1 hover:bg-amber-500 rounded-sm w-full mt-1 px-2 hover:text-white 'onClick={handleLogout} >Logout</Link>
    
    </div>

  )
}

export default AccountMenu