import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice"
import productReducer from "./productSlics"
import cartReducer from "./cartProductSlice"
import addressReducer from "./addressSlice"
export const store = configureStore({
  reducer: {
    user: userReducer,
    product:productReducer,
    cart:cartReducer,
    address:addressReducer
  },
})