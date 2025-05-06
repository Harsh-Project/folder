import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import rewardPageSlice from "../reducer/rewardPageSlice";

const reducer = combineReducers({
  rewardPage: rewardPageSlice,
});
const store = configureStore({
  reducer,
});
export default store;
