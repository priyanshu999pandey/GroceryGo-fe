import React from "react";
import AccountMenu from "../utils/AccountMenu";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiExternalLink } from "react-icons/fi";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";

const DashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.user);

    

  return (
    <section className="flex flex-row bg-white">
      {/* Sidebar: fixed on large screens */}
      <div
        className="
          hidden lg:block
          lg:fixed lg:left-0 lg:top-21  lg:w-[15%]
         
          "
      >
        <div className="w-full  px-5 py-5 flex flex-col items-start">
          <div className="px-2">
            <p className="font-semibold text-lg">My Account</p>
            <div className="flex gap-2">
              <p className="text-sm text-gray-500 mb-2">{user?.name}</p>
              {/* <Link to={"/dashboard/profile"} className="hover:text-yellow-500">
                <FiExternalLink />
              </Link> */}
            </div>
          </div>

          <div className="border-b border-gray-200 w-full"></div>

         {
          user?.role ==="ADMIN" &&<div className="flex flex-col">
             <Link
            to={"category"}
            className="text-md text-gray-500 py-2 hover:bg-amber-500 rounded-sm w-full mt-4 px-2 hover:text-white"
          >
            Category
          </Link>
          <Link
            to={"subCategory"}
            className="text-md text-gray-500 py-2 hover:bg-amber-500 rounded-sm w-full mt-4 px-2 hover:text-white"
          >
            Sub Category
          </Link>
          <Link
            to={"upload-product"}
            className="text-md text-gray-500 py-2 hover:bg-amber-500 rounded-sm w-full mt-4 px-2 hover:text-white"
          >
            Upload Product
          </Link>
          <Link
            to={"product"}
            className="text-md text-gray-500 py-2 hover:bg-amber-500 rounded-sm w-full mt-4 px-2 hover:text-white"
          >
            Product
          </Link>
          </div>
         }

          <Link
            to={"my-orders"}
            className="text-md text-gray-500 py-2 hover:bg-amber-500 rounded-sm w-full mt-4 px-2 hover:text-white"
          >
            My orders
          </Link>

          <Link
            to={"address"}
            className="text-md text-gray-500 py-2 hover:bg-amber-500 rounded-sm w-full mt-4 px-2 hover:text-white"
          >
            Save address
          </Link>
         
        </div>
      </div>

      {/* Main content: push to the right on large screens and make scrollable */}
      <div className="w-full lg:ml-[15%] h-screen border-l border-slate-100 overflow-y-auto hide-scrollbar">
  <Outlet />
</div>

    </section>
  );
};

export default DashBoard;
