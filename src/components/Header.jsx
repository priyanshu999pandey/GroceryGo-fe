import React, { useEffect, useState } from "react";

import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { GiShoppingCart } from "react-icons/gi";
import { useSelector } from "react-redux";
import { VscTriangleDown } from "react-icons/vsc";
import AccountMenu from "../utils/AccountMenu";
import { VscTriangleUp } from "react-icons/vsc";
import Axios from "../utils/Axios";
import GlobalProvider, { GlobalContext, useGlobalContext } from "../provider/GlobalProvider";
import DisplayCartItems from "./DisplayCartItems";

const Header = () => {

  const cartItem = useSelector((state)=>state.cart.cartItem)
  const navigate = useNavigate()

  const [isOpenMenu,setIsOpenMenu] = useState(false);
  const [isMobile] = useMobile();
  const [openCartDialoug,setOpenCartDialoug] = useState(false)
  // console.log(openCartDialoug);

  const {cartQuantity,price} = useGlobalContext()
  // console.log("price",price)
  // const [cartQuantity,setCartQuantity] = useState(0)
  // const [price,setPrice] = useState(0)

  // const calculateCartItem = ()=>{

  //   const cartQty = cartItem.reduce((accu,item)=>{
  //     return accu + item.quantity
  //    },0)
  //   const finalPrice = cartItem.reduce((accu,item)=>{
  //     // console.log("item",item.quantity);
      
  //     return accu + (item.productId.price * item.quantity )
      
  //    },0)
  //   //  console.log("cartQYT",cartQty)
  //    console.log("price",finalPrice)

  //    setCartQuantity(cartQty)
  //    setPrice(finalPrice)
  // }

  // useEffect(()=>{
  //      calculateCartItem()
  // },[cartItem])

  const location = useLocation();
  const { user } = useSelector((state) => state?.user);
  // console.log("user from store", user);

  const isSearhPage = location.pathname === "/search";
  // console.log(isSearhPage);

  const handleMenu = ()=>{
      if(!user._id){
         navigate("/login")
      }else{
         navigate("/user")
      }
  }

  return (
    <header className="  h-24 py-2 px-3 h-30 lg:h-20 lg:py-4 shadow-md sticky top-0 bg-white z-70">
      {!(isSearhPage && isMobile) && (
        <div className="  w-full container mx-auto  flex justify-between items-center ">
          {/* logo */}
          <Link to={"/"} className="h-full flex justify-center items-center">
            
               <div className="text-3xl flex justify-center items-center ">
                  <p className="text-yellow-500 font-medium text-5xl">G</p>
                <p className="text-yellow-500 font-medium">rocery</p>
                <p className="text-green-700 text-5xl">Go</p>
               </div>
          
          </Link>

          {/* searchBar */}
          <div className="hidden lg:block">
            <Search></Search>
          </div>
          {/* login my cart */}
          <div>
            {/* for mobile */}

         {!user?._id ? (
  <button
    className="lg:hidden px-4 py-2 bg-green-800 text-white rounded-full hover:bg-green-800 transition"
    onClick={() => navigate("/login")}
  >
    Login
  </button>
) : (
  <button
    className="lg:hidden p-1 rounded-full"
    onClick={handleMenu}
    aria-label="User Menu"
  >
    <img
      src={user.avatar}
      className="w-12 h-12 rounded-full object-cover"
      alt="user avatar"
    />
  </button>
)}

            {/* for desktop */}

            <div className="hidden  lg:flex flex-row gap-10 justify-center items-center ">
              {
              
                  user?._id ?(
                    <div className="relative">
                       <div className="flex justify-center items-center gap-2 " onClick={()=>setIsOpenMenu(!isOpenMenu)} >
                            <p>Account</p>
                      {
                        isOpenMenu?(<VscTriangleUp className="w-7 h-7 "  />):(   <VscTriangleDown className="w-7 h-7 " />)
                      }
                       </div>
                       <div className="absolute top-15 left-[-40px] ">
                            {
                              isOpenMenu &&  <AccountMenu setIsOpenMenu={setIsOpenMenu} />
                            }
                       </div>
                    </div>
                  ):(
                  <Link
                    to={"/register"}
                    className="px-4 py-2 bg-slate-200 rounded-sm "
                  >
                    Login
                  </Link>
                  )
                 
              }

            <div className="flex justify-center items-center bg-green-800 text-white gap-2 px-4 py-2 rounded-sm hover:bg-green-700" onClick={()=>{
              console.log("clicked");
              setOpenCartDialoug(true)
              
              
            }} >
                <div className="animate-bounce ">
                  <GiShoppingCart size={28} />
                </div>
                {
                  cartItem[0]?(<div className="text-xs">
                    <p> {cartQuantity} Item</p>
                    <p>₹{Number(price)}.00</p>
                  </div>):
                  (<div>
                    <p>My cart</p>
                  </div>)
                }
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="py-2 lg:hidden">
        <Search />
      </div>

      <div>
         {
          openCartDialoug && <DisplayCartItems close={setOpenCartDialoug} cartItem={cartItem} />
         }
      </div>
    </header>
  );
};

export default Header;
