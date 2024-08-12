import { createSlice } from "@reduxjs/toolkit";

// Async thunk để fetch lại dữ liệu người dùng từ API
// export const fetchUser = createAsyncThunk(
//   "user/fetchUser",
//   async (userId, thunkAPI) => {
//     const response = await fetch(`/api/user/${userId}`);
//     const data = await response.json();
//     return data;
//   }
// );

export const counterSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login: (state, actions) => {
      return actions.payload;
    },
    logout: () => {
      return null;
    },
    updateUser: (state, actions) => {
      return { ...state, ...actions.payload };
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchUser.fulfilled, (state, action) => {
  //     return action.payload;
  //   });
  // },
});

export const { login, logout, updateUser } = counterSlice.actions;
export const selectUser = (store) => store.user;
export default counterSlice.reducer;
