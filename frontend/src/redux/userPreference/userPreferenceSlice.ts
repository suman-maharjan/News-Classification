import { createSlice } from "@reduxjs/toolkit";
import { IUserPreference } from "./IUserPreference";
import { updateUserPreference } from "./userPreferenceReducer";

const initialState: IUserPreference = {
  loggedIn: false,
};

export const userPreferenceSlice = createSlice({
  name: "userPreference",
  initialState,
  reducers: {
    _updateUserPreference: updateUserPreference,
  },
});

export const { _updateUserPreference } = userPreferenceSlice.actions;
export default userPreferenceSlice.reducer;
