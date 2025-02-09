import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { authSlice } from "./reduxIndex";

const appReducer = combineReducers({
  auth: authSlice,
});

const rootReducer: Reducer = (state, action) => {
  if (action.type == "reset") {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
