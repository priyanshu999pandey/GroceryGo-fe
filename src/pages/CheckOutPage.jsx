import React, { useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import AddAddress from "../components/AddAddress";
import { useSelector } from "react-redux";

const CheckOutPage = () => {
  const { priceWithoutDiscount, price, cartQuantity } = useGlobalContext();
  const [openAddAddress,setOpenAddAddress] = useState(false)
  const addressList = useSelector(state=>state.address.address)
  const [selectedAddress,setSelectedAddress] = useState(0);
  
  console.log(addressList[selectedAddress])
  
  return (
    <div className="w-full  min-h-[78vh] flex bg-white ">
      {/* left */}
      <div className="w-[50%] p-4 ">
        <div>
          <h3 className="text-lg font-semibold">Choose your address</h3>
          <div className="w-full h-10 border-dashed border-2 border-blue-300 flex justify-center items-center my-5 " onClick={()=> setOpenAddAddress(true)}>
            <p>Add address</p>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-5 w-full h-[55vh] overflow-hidden overflow-y-auto">
          {
            addressList.map((address,index)=>{
              return(
             <label htmlFor={"selectedAddress"+index} >
               <div className="border border-green-400 bg-green-100 text-sm p-4 flex gap-1 hover:bg-green-200 ">
                 <div> <input type="radio" value={index} onChange={()=>setSelectedAddress(index)} id={"selectedAddress"+index} name="address" /> </div>
                  <div>
                     <p>{address.address_line},{address.city}</p>
                 
                 <p>{address.state}</p>
                 <p>{address.country}-{address.pincode}</p>
                 <p>{address.mobile}</p>
                  </div>
              </div>
             </label>
              )
            })
          }
        </div>
      </div> 
      <div className="h-[78vh]  border-r border-gray-200"></div>
      {/* right */}
      <div className="w-[50%]  p-4">
        <div>
          <h3 className="text-lg font-semibold mb-5">Summary</h3>
          <div>
            <div className="border border-green-200 p-2 rounded">
              <p>Bill details</p>

              <div className="p-2">
                <div className="flex justify-between text-xs">
                  <p>Total Price</p>
                  {/* <p>₹{}</p> */}
                  <p>₹{price}.00</p>
                </div>
                <div className="flex justify-between text-xs ">
                  <p>Delivery Charge</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between text-xs">
                  <p>Total Items</p>
                  <p>{cartQuantity} Items</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full my-2 flex flex-col gap-5  ">
             <div className="w-full h-10 text-white bg-green-800 hover:bg-green-700  flex justify-center items-center rounded-md">Online Payment</div>
             <div className="w-full h-10 text-green-800 border-2  flex justify-center items-center rounded-md">Cash on Delivery</div>
          </div>
        </div>
      </div>
      {
        openAddAddress && <AddAddress close={setOpenAddAddress} />
      }
    </div>
  );
};

export default CheckOutPage;
