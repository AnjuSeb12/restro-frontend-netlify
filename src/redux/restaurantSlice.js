import { createSlice } from "@reduxjs/toolkit";
const initialState={
    restaurants:[]
}
const restaurantSlice=createSlice({
    name:"Restaurantslice",
    initialState,
    reducers:{
        getRestaurants:(state,action) => {
            state.restaurants=action.payload
        }
    }
});
export const {getRestaurants}=restaurantSlice.actions;
export default restaurantSlice.reducer;
