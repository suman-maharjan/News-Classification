import { Draft } from "immer";
import { IUserPreference } from "./IUserPreference";
import { PayloadAction } from "@reduxjs/toolkit";

export const updateUserPreference = (
  state: Draft<IUserPreference>,
  action: PayloadAction<Partial<IUserPreference>>
) => {
  state.loggedIn = action.payload.loggedIn ?? state.loggedIn;
};
