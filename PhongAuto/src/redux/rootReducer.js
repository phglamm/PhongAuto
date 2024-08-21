import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import orderReducer from "./features/orderSlice";
import cartReducer from "./features/cartSlice";

const rootReducer = combineReducers({
  user: counterReducer,
  order: orderReducer,
  cart: cartReducer,
});

export default rootReducer;
