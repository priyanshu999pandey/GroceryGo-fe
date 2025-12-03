import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Axios from "../utils/Axios";
import { handleAddress } from "../store/addressSlice";
import { useDispatch } from "react-redux";
import { useGlobalContext } from "../provider/GlobalProvider";
import toast from "react-hot-toast";

const EditAddress = ({ close, Data }) => {
    console.log("Data",Data)
    const [loading,setLoading] = useState(false)
    const {fetchAddress} = useGlobalContext()
    const dispatch = useDispatch()

  const [data, setData] = useState({
    address:Data?.address_line,
    city: Data?.city,
    state: Data?.state,
    pincode:Data.pincode,
    mobile:Data.mobile,
    country:Data.country,
    _id:Data._id
  });
//   console.log("Edit data",data)

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();

    try {
      const res = await Axios.put("/address/update-address", data);
      console.log("address ka data", res);

      if (res?.data?.success) {
          // dispatch(handleAddress(res?.data?.data))
          toast.success(res?.data?.message)
          fetchAddress()
        setData({
          address: "",
          city: "",
          state: "",
          pincode: "",
          mobile:"",
          country: "",
          _id:"",
        });
         close(false)
      }

     

    } catch (error) {
      console.log(error);
    }finally{
        setLoading(false)
        
    }
  };
//   console.log("ADD adress data", data);

  return (
    <div className="w-full h-full py-10 bg-black/80 fixed top-0 bottom-0 left-0 right-0 flex justify-center  z-80  ">
      <div className="  w-full max-w-sm bg-white  p-4">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-medium text-center text-xl"> Edit Address</h2>
          <p onClick={() => close(false)}>
            <IoMdClose className="hover:text-red-500 text-3xl" />
          </p>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="addressLine">Address Line:</label>
            <div>
              <input
                type="text"
                id="addressLine"
                name="address"
                value={data.address}
                onChange={handleChange}
                placeholder="Enter Address"
                className="w-full focus-within: outline-none border border-blue-400 bg-blue-100 p-1 rounded-md px-2"
              />
            </div>
          </div>
          <div>
            <label htmlFor="city">City:</label>
            <div>
              <input
                type="text"
                id="city"
                name="city"
                value={data.city}
                onChange={handleChange}
                placeholder="Enter City Name"
                className="w-full focus-within: outline-none border border-blue-400 bg-blue-100 p-1 rounded-md px-2"
              />
            </div>
          </div>
          <div>
            <label htmlFor="state">State</label>
            <div>
              <input
                type="text"
                id="state"
                name="state"
                value={data.state}
                onChange={handleChange}
                placeholder="Enter State Name"
                className="w-full focus-within: outline-none border border-blue-400 bg-blue-100 p-1 rounded-md px-2"
              />
            </div>
          </div>
          <div>
            <label htmlFor="pincode">PinCode:</label>
            <div>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={data.pincode}
                onChange={handleChange}
                placeholder="Enter pincode"
                className="w-full focus-within: outline-none border border-blue-400 bg-blue-100 p-1 rounded-md px-2"
              />
            </div>
          </div>
          <div>
            <label htmlFor="country">Country:</label>
            <div>
              <input
                type="text"
                id="country"
                name="country"
                value={data.country}
                onChange={handleChange}
                placeholder="Enter country name"
                className="w-full focus-within: outline-none border border-blue-400 bg-blue-100 p-1 rounded-md px-2"
              />
            </div>
          </div>
          <div>
            <label htmlFor="mb">Mobile No:</label>
            <div>
              <input
                type="text"
                id="mb"
                name="mobile"
                value={data.mobile}
                onChange={handleChange}
                placeholder="Enter Mobile No"
                className="w-full focus-within: outline-none border border-blue-400 bg-blue-100 p-1 rounded-md px-2"
              />
            </div>
          </div>
          <button className="w-full bg-yellow-500 hover:bg-amber-300 rounded px-4 py-2">
            {
                loading ? "loading...":"Submit"
            }
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAddress;
