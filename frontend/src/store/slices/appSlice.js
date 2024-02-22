// Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    user: localStorage.getItem("user"),
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = appSlice.actions;
export const appReducer = appSlice.reducer;
