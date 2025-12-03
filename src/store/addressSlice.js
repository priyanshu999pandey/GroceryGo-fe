import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    address:[]
}

const addressSlice = createSlice({
    name:"address",
    initialState:initialValue,
    reducers:{
        handleAddress:(state,action)=>{
            state.address = [...action.payload];
        }
    }
})
 export const {handleAddress} = addressSlice.actions;
 
 export default addressSlice.reducer