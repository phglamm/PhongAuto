import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import orderReducer from "./features/orderSlice";

const rootReducer = combineReducers({
  user: counterReducer,
  order: orderReducer,
});

export default rootReducer;
