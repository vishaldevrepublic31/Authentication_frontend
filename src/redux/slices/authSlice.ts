import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user :null,
    users:[]
  };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state,action){
            state.user = action.payload
        },
        users(state,action){
            state.users = action.payload
        },
        logout(state){
            state.user = null
        }
    },
});


export  const {login,logout,users} = authSlice.actions
console.log(authSlice);

export default authSlice.reducer