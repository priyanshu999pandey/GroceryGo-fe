import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios';
import { useDispatch, useSelector } from 'react-redux';
import { useGlobalContext } from '../provider/GlobalProvider';
import toast from 'react-hot-toast';
import { FaMinus } from "react-icons/fa";
import { FaPlus } from 'react-icons/fa6';
import { useLocation, useParams } from 'react-router-dom';

const AddToCartButton = ({data}) => {
  const location = useLocation()

  const [path,setPath] = useState("/")
  // console.log("location",location);
  

  const cartItems = useSelector((state)=>state.cart.cartItem)

  // console.log(data);  
  
  // console.log("cardData",data)
  // console.log("cardItems",cartItems)

  const dispatch = useDispatch();
  const {fetchCartData,updateCartItem,deleteCartItem} = useGlobalContext()
  const [isAvailableCart,setIsAvailableCart] = useState(false)
  const [qty,setQty] = useState(1)
  const [loading, setLoading] = useState(false);
  const [cartItemDetail,setCartItemDetail] = useState({})

  useEffect(()=>{
    const checkingitem = cartItems.some(item => item.productId._id === data._id)
    //  console.log(checkingitem);
    setIsAvailableCart(checkingitem)
   

    const product = cartItems.find( item => item.productId._id === data._id)
    setQty(product?.quantity)
    setCartItemDetail(product)
    // console.log(product)
    
  },[cartItems,location.pathname])

  
  useEffect(()=>{
    if(location.pathname !== "/"){
      fetchCartData()
    }
  },[path])


   const handleADDTocart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      const res = await Axios.post("/cart/create", {
        productId: data?._id,
      });

      console.log("cart response", res);

      if (res?.data?.success) {
         if(fetchCartData){
          fetchCartData()
         }
        toast.success(res?.data?.message);
      } else {
        toast.error(error?.response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  const increaseQty = (e)=>{
    e.preventDefault()
    e.stopPropagation()
     updateCartItem(cartItemDetail?._id,qty+1)
    console.log(cartItemDetail?._id,qty+1)
    
  }
  const decreaseQty = (e)=>{
    e.preventDefault()
    e.stopPropagation()
    console.log(cartItemDetail?._id,qty-1)
   if(qty == 1){
    deleteCartItem(cartItemDetail?._id)
    console.log("cartItemDetailId",cartItemDetail?._id)
   }else{
     updateCartItem(cartItemDetail?._id,qty-1)
   }


  }


  return (
  <div>
    {isAvailableCart ? (
      <div
        className="
          flex items-center justify-between
          bg-gradient-to-r from-green-600 to-emerald-500
          text-white rounded-full
          px-3 py-1.5
          min-w-[95px]
          shadow-lg
          backdrop-blur
        "
      >
        <button
          onClick={decreaseQty}
          className="p-1 rounded-full hover:bg-white/20 transition active:scale-90"
        >
          <FaMinus size={12} />
        </button>

        <span className="font-semibold text-sm">{qty}</span>

        <button
          onClick={increaseQty}
          className="p-1 rounded-full hover:bg-white/20 transition active:scale-90"
        >
          <FaPlus size={12} />
        </button>
      </div>
    ) : (
      <button
        onClick={handleADDTocart}
        className="
          px-5 py-1.5
          rounded-full
          text-sm font-semibold
          text-white
          bg-gradient-to-r from-green-600 to-emerald-500
          hover:from-green-500 hover:to-emerald-400
          shadow-md hover:shadow-lg
          transition-all duration-200
          active:scale-95
        "
      >
        + Add
      </button>
    )}
  </div>
);

}

export default AddToCartButton