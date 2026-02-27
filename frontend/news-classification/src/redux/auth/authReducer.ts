import { Draft } from "immer";
import { IAuthState } from "./type";
import { PayloadAction } from "@reduxjs/toolkit";

export const setIsUserLoggedIn = (
  state: Draft<IAuthState>,
  action: PayloadAction<Partial<IAuthState>>
) => {
  state.isUserLoggedIn = action.payload.isUserLoggedIn ?? state.isUserLoggedIn;
};
