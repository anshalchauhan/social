// Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    user: localStorage.getItem("user"),
    username: localStorage.getItem("username"),
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsernameState: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setUser, setUsernameState } = appSlice.actions;
export const appReducer = appSlice.reducer;
