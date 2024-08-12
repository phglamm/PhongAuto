import { createSlice } from "@reduxjs/toolkit";

// Async thunk để fetch lại dữ liệu người dùng từ API

export const orderSlice = createSlice({
  name: "order",
  initialState: null,
  reducers: {
    order: (state, actions) => {
      return actions.payload;
    },
    clearOrder: () => {
      return null;
    },
  },
});

export const { order, clearOrder } = orderSlice.actions;
export const selectOrder = (store) => store.order;
export default orderSlice.reducer;
