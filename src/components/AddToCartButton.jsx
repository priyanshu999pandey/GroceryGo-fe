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
      {
        isAvailableCart ? (<div className='flex bg-green-800 text-white gap-3 justify-center items-center  rounded w-22 '>
           <p className='border-r p-1 ' onClick={decreaseQty} ><FaMinus /></p>
           <p>{qty}</p>
           <p className='border-l p-1 ' onClick={increaseQty}><FaPlus /></p></div>):(          
      <div>
         <button
          onClick={handleADDTocart}
          className="text-center text-white px-4  bg-green-800 hover:bg-green-700 rounded "
        >
          {" "}
          Add
        </button>
      </div>
        )
      }

    </div>
  )
}

export default AddToCartButton