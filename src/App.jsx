import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header'
import { Routes,Route, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './pages/Home'
import SearchPage from './pages/SearchPage'
import Register from './pages/Register'
import { Toaster } from "react-hot-toast";
import Login from './pages/Login'
import OtpVerification from './pages/OtpVerification'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import FetchUserDetails from './utils/FetchUserDetails'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from './store/userSlice'
import AccountMenuMobile from './utils/AccountMenuMobile'
import DashBoard from './layout/DashBoard'
import Profile from "./pages/Profile" 
import Myorders from './pages/Myorders'
import Category from './pages/Category'
import SubCategory from './pages/SubCategory'
import UploadProduct from './pages/UploadProduct'
import { handleAddItemCart } from './store/cartProductSlice'

import ProductAdmin from './pages/ProductAdmin'
import AdminRoutes from './utils/AdminRoutes'
import Axios from './utils/Axios'
import { setAllCategory, setLoadingCategory, setsubCategory } from './store/productSlics'
import ProductListPage from './pages/ProductListPage'
import ProductDisplayPage from './pages/ProductDisplayPage'
import Product from './pages/Product'
import GlobalProvider from './provider/GlobalProvider'
import AddToCartMobileLink from './components/AddToCartMobileLink'
import ViewCart from './pages/ViewCart'
import CheckOutPage from './pages/CheckOutPage'
import Address from './pages/Address'
import OrderSuccess from './pages/OrderSuccess'
import OrderCancel from './pages/OrderCancel'


function App() {

  const path = useLocation()
  // console.log("path",path)

  const loading = useSelector((state)=>state.product.loadingCategory)
  const dispatch = useDispatch();

  const fetchUser = async()=>{
    const userData = await FetchUserDetails()
    // console.log(userData)
    dispatch(setUserDetails(userData?.data))
  }
   const fetchCategoryData = async () => {
       
      try {
        dispatch(setLoadingCategory(true))
        const res = await Axios.get("/category/fetch-category");
        const subCat = await Axios.get("/subCategory/fetch-subCategory");
       
        // console.log("app wala data",res?.data?.data);
        // console.log("subdata",subCat)
        // console.log("before", categoryData);
        // setCategoryData(res?.data?.data);
        dispatch(setAllCategory(res?.data?.data))
        dispatch(setsubCategory(subCat?.data?.data))
        dispatch(setLoadingCategory(false))
      } catch (error) {
        console.log(error);
      }
  };


  useEffect(()=>{
    fetchUser()
    fetchCategoryData();
    // fetchCartData()
  },[])

  

  

  return (
    <GlobalProvider >
    <Header/>
      <main className='min-h-[78vh]'>
          <Routes >
          <Route path='/' element={<Home></Home>} />
          <Route path='/search' element={<SearchPage></SearchPage>} />
          <Route path='/register' element={<Register />} />
         
          <Route path='/login' element={<Login />} />
          <Route path='/otp-verification' element={<OtpVerification />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/user' element={<AccountMenuMobile/>} />
          <Route path=':category/:subcategory' element={<ProductListPage/>} />
          <Route path='/:category' element={<Product/>} />
          <Route path='/cart' element={<ViewCart/>} />
          <Route path='/checkoutpage' element={<CheckOutPage/>} />
          <Route path='/success' element={<OrderSuccess/>} />
          <Route path='/cancel' element={<OrderCancel/>} />
          
          <Route path='/product/:product' element={<ProductDisplayPage/>} />

          <Route path='/dashboard' element={<DashBoard />} >
           <Route path='address' element={<Address />} />
            <Route index element={<Profile />} />
            <Route path='profile' element={<Profile />} />
            <Route path='my-orders' element={<Myorders />} />
            <Route path='category' element={<AdminRoutes> <Category /></AdminRoutes>} />
             <Route path='subCategory' element={<AdminRoutes><SubCategory /></AdminRoutes>} />
            <Route path='upload-product' element={<AdminRoutes><UploadProduct/></AdminRoutes>} />
            <Route path='product' element={<AdminRoutes><ProductAdmin /></AdminRoutes>} />
          </Route>

        </Routes>
      </main>
     {
       path.pathname !== "/cart" &&  <AddToCartMobileLink />
     }
    <Footer/>
   
    <Toaster position="top-right" reverseOrder={false} />
    </GlobalProvider>
    
  )
}

export default App
