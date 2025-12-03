import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from '../components/AddAddress'
import { RiDeleteBin3Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import EditAddress from '../components/EditAddress';
import Axios from '../utils/Axios';
import toast from 'react-hot-toast';
import { useGlobalContext } from '../provider/GlobalProvider';


const Address = () => {
    const addressList = useSelector(state=>state.address.address)
    const {fetchAddress} = useGlobalContext()
    const [openAddress,setOpenAddress] = useState(false)
    const [editAddress,setEditAddress] = useState(false)
    const [editData,setEditData] = useState(null)

    const handleDeleteAddress = async(addressId)=>{
        try {
             const res = await Axios.delete("/address/delete-address",{
                data:{ addressId}
             })

             if(res?.data?.success){
                console.log(res?.data?.data)
                fetchAddress()
                toast.success(res?.data?.message)

             }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='w-full h-full'>
        <div className='w-full h-15 shadow flex justify-between items-center p-4'>
            <p className='text-lg '>Address</p>
            <button className='px-2 py-1 bg-yellow-300  hover:bg-amber-300 border border-yellow-500 rounded-full' onClick={()=>setOpenAddress(true)}>
                Add Address
            </button>
        </div>
       <div>
        
        <div className="flex flex-col gap-5 mt-5 w-full p-4  ">
          {
            addressList.map((address,index)=>{
                // console.log("address",address)
              return(
             <label htmlFor={"selectedAddress"+index} >
               <div className="border border-green-400 bg-green-100 text-sm p-4 flex justify-between gap-1 hover:bg-green-200 ">
                
                  <div>
                     <p>{address.address_line},{address.city}</p>
                 
                 <p>{address.state}</p>
                 <p>{address.country}-{address.pincode}</p>
                 <p>{address.mobile}</p>
                  </div>
                  <div className='grid gap-3 ' >
                    <button onClick={()=>{
                        setEditAddress(true)
                        setEditData(address)
                    }} className='bg-green-300 w-fit h-fit p-2 rounded-4xl hover:bg-green-500 hover:text-white'><FaEdit size={15} /></button>
                    <button onClick={()=>handleDeleteAddress(address._id)} className='bg-red-300  w-fit h-fit p-2 rounded-4xl hover:bg-red-500 hover:text-white' ><RiDeleteBin3Line size={15} /></button>
                  </div> 
                   
              </div>
          
             </label>
              )
            })
          }
        </div>

       </div>

       {
        openAddress && (<AddAddress close={setOpenAddress} />)
       }
         {
          editAddress && (<EditAddress close={setEditAddress} Data={editData} />)
        }
      
    </div>
  )
}

export default Address