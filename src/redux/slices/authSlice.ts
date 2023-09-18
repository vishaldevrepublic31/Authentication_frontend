import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user :null
  };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state,action){
            state.user = action.payload
        },
        logout(state){
            state.user = null
        }
    },
});


export  const {login,logout} = authSlice.actions
console.log(authSlice);

export default authSlice.reducer