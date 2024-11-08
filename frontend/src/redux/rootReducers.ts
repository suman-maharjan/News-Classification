import { IUserPreference, userPreferenceSlice } from "./reduxIndex";
import { combineReducers, Reducer, UnknownAction } from "@reduxjs/toolkit";

interface AllStates {
  userPreference: IUserPreference;
}

const appReducer = combineReducers({
  userPreference: userPreferenceSlice,
});

const rootReducer: Reducer<AllStates, UnknownAction> = (state, action) => {
  if (action.type == "reset") {
    console.log("this executed");
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
