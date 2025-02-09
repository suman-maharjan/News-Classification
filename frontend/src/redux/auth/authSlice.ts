import { createSlice } from "@reduxjs/toolkit";
import { intialState } from "./type";
import { setIsUserLoggedIn } from "./authReducer";

export const authSlice = createSlice({
  name: "auth",
  initialState: intialState,
  reducers: {
    _setIsUserLoggedIn: setIsUserLoggedIn,
  },
});

export const { _setIsUserLoggedIn } = authSlice.actions;
export default authSlice.reducer;
