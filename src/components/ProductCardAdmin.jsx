import React, { useState } from 'react'


const ProductCardAdmin = ({data}) => {
  const productDetail = data
  const [close,setClose] = useState(false)
  console.log("product-data",productDetail);
  
  return (
    <div className=''>
        <div className='border border-yellow-500 bg-white rounded-md overflow-hidden '>
            <img src={data.image[0]} />
            <div className='flex flex-col justify-center items-center p-2'>
             <p className='text-sm text-center line-clamp-2'>{data?.name}</p>
            <p className='text-sm text-gray-500'>{data?.unit}</p>
           </div>


        </div>
    

        
    </div>
  )
}

export default ProductCardAdmin