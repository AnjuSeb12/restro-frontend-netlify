import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    token:null,
    isAuthenticated:false,
}
const userAuthSlice=createSlice({
    name:"userAuthSlice",
    initialState,
    reducers:{
        authUserSuccess:(state,actions) =>
        {
            // console.log("user....",actions.payload)
            state.user=actions.payload.user;
            state.token=actions.payload.token;
            state.isAuthenticated=true;
        },
        userLogout:(state,actions) =>
        {
            // console.log("user....",actions.payload)
            state.user=null;
            state.token=null;
            state.isAuthenticated=false;
        }
        
    }
}); 
export const {authUserSuccess,userLogout}=userAuthSlice.actions;
export default userAuthSlice.reducer;