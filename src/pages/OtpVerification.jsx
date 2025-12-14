import React, { useEffect, useRef } from 'react'
import  { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from '../utils/Axios';

const OtpVerification = () => {
  const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState(["","","","","",""]);
    const inputRef = useRef([])
    const [loading, setLoading] = useState(false);

   console.log(location)
   
   useEffect(()=>{
    if(!location.state?.email){
      navigate("/forget-password")
    }
   })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if ( !data.email || !data.password) {
    //   toast.error("Please fill all fields");
    //   return;
    // }

   

    setLoading(true);
    const loadingToastId = toast.loading("login...");

    try {
      const res = await Axios.put(
        "/user/verify-forgot-password",
        {
          otp:data.join(""),
          email:location?.state?.email

        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
          validateStatus: (s) => s < 500,
        }
      );

      console.log("Response:", res.status, res.data);

      if (res.status === 200 || res.data?.sucess) {
        console.log("it works");
        toast.success(res.data?.message || "Registered successfully!");
        // setData({  email: "", password: "", });
        navigate("/reset-password",{
          state:{
            data:res.data,
            email:location.state?.email
          }
        })

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
        <p className="mb-2 text-lg sm:text-xl font-medium text-center">OTP Verification</p>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
         

        
          <div className="w-full">
            <label htmlFor="otp" className="text-sm">OTP:</label>
            {/* <-- changed wrapper to flex so boxes sit horizontally --> */}
            <div className='flex gap-3 mt-2'>
                {
                    data.map( (element,index)=>{ 
                        return(
                          <div
                            key={index}
                            className="w-12 h-12 flex items-center justify-center px-1 bg-slate-200 border-2 border-gray-200 focus-within:border-yellow-500 rounded"
                          >
                            <input
                                type="text"
                                // name="email"
                                ref={(ref)=>{
                                  inputRef.current[index] = ref
                                  return ref;
                                }}
                                value = {data[index]}
                                onChange={(e)=>{
                                  const value = e.target.value;
                                  console.log("value:",value);

                                  const newData= [...data];
                                  newData[index] = value;
                                  setData(newData);
                                  
                                  if(value && index < 5){
                                    inputRef.current[index+1].focus();
                                  }
                                }}
                                maxLength={1}
                                id={`otp-${index}`}
                                // value={data.email}
                                // onChange={handleChange}
                                // placeholder="Enter your email"
                                className="w-full h-full text-center text-lg font-medium focus:outline-none bg-transparent"
                            />
                          </div>
                        )
                    })
                }
            </div>
           
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-2 py-2 rounded-lg text-lg text-white tracking-wider ${
              loading ? "bg-green-500 cursor-wait" : "bg-green-800 hover:bg-green-700"
            }`}
          >
            {loading ? "Verifying OTP..." : "Verify"}
          </button>

        </form>
      </div>
    </div>
  );
};
export default OtpVerification
