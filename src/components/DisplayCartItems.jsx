import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobalProvider";
import { useSelector } from "react-redux";
import empty_cart from "../assets/empty_cart.webp"
import AddToCartButton from "../components/AddToCartButton"
import {priceWithDiscount} from "../utils/Discount"
import { FaArrowRight } from "react-icons/fa";
import toast from "react-hot-toast";

const DisplayCartItems = ({ close }) => {
     const { priceWithoutDiscount,price,cartQuantity } = useGlobalContext();
     const user = useSelector((state)=>state.user.user)
     const navigate = useNavigate()
     const cartItems = useSelector((state)=>state.cart.cartItem)
    //  console.log("cartItem",cartItems);
    
    const handleCheckOutPage = ()=>{
        if(user?._id){
            close(false)
           navigate("/checkoutpage")
        }else{
          toast.error("Login please")
        }
    }
     
  

  useEffect(() => {
    //  const data = fetchCartData()

    if (close) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // cleanup (jab component unmount ho)
    return () => document.body.classList.remove("overflow-hidden");
  }, [close]);

  if (!close) return null;

  return (
    <div className="top-30  fixed bg-black/80 lg:top-0 bottom-0 left-0 right-0 z-90 ">
      <div className="w-screen ml-auto bg-white h-full md:max-w-sm lg:max-w-sm">

        <div className="flex items-center justify-between p-2 shadow">
          <p>cart</p>
          <Link to={"/"} className="lg:hidden md:hidden">
            <IoClose
              size={24}
              className="cursor-pointer"
              onClick={() => close(false)}
            />
          </Link>
          <div className="hidden lg:block md:block">
            <IoClose
              size={24}
              className="cursor-pointer"
              onClick={() => close(false)}
            />
          </div>
        </div>

      {
        cartItems[0]?( <div className="p-2 flex flex-col justify-between  gap-9 ">
          <div className="flex justify-between items-center bg-green-200   px-4 py-2 rounded ">
            <p className="">Your Total saving</p>
            <p>₹{priceWithoutDiscount}.00</p>
          </div>
          <div className="max-h-[30vh] md:max-h-[50vh] lg:max-h-[50vh]  overflow-hidden overflow-y-auto  ">
             {
              cartItems.map((item,index)=>{
                console.log(item?.productId);
                
                return(<div className="flex justify-between items-center  h-20 px-4 my-2 ">
                   <div className="w-16 h-16">
                    <img src={item.productId.image[0]} className="w-full h-full object-scale-down" />
                   </div>
                   <div className="w-40  ">
                    <p className="text-xs line-clamp-2">{item.productId.name}</p>
                    <p className="text-xs text-gray-400 ">{item.productId.unit}</p>
                    <p className="text-sm font-semibold ">₹{Number(priceWithDiscount(item.productId.price,item.productId.discount))}.00</p>
                   </div>
                   <div>
                     <AddToCartButton data={item?.productId} />
                   </div>
                </div>)
              })
             }
          </div>

          <div className="border border-green-200 p-2 rounded">
             <p>Bill details</p>

             <div className="p-2" >
               <div className="flex justify-between text-xs">
                 <p>Total Price</p>
                 {/* <p>₹{}</p> */}
                 <p>₹{price}.00</p>
               </div>
               <div className="flex justify-between text-xs " >
                 <p>Delivery Charge</p>
                 <p>Free</p>
               </div>
               <div className="flex justify-between text-xs" >
                 <p>Total Items</p>
                 <p>{cartQuantity} Items</p>
               </div>
               
             </div>

            </div> 
         
         <div className="bg-green-800 flex justify-between items-center text-white px-4 py-2 rounded ">
            <div>
              <p className=" " >₹{price}.00</p>
            </div>
            <div className="flex gap-2 items-center" onClick={handleCheckOutPage} >
              <p className=" " >proceed</p>
              <FaArrowRight />
            </div>
         </div>

        </div>):(
          <div className="flex flex-col justify-center items-center mt-10 ">
            <img src={empty_cart} className="w-full h-full object-scale-down" />
            <p className="text-sm text-gray-400">No Item Found</p>
            <Link to={"/"} onClick={()=>close(false)} className="px-4 py-2 bg-amber-500 hover:bg-yellow-300 rounded-full">
              Shop Now 
            </Link>
          </div>
        )
      }
      </div>
    </div>
  );
};

export default DisplayCartItems;
