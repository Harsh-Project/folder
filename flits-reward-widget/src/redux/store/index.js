import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import rewardWidgetSlice from "../reducer/rewardWidgetSlice";

const reducer = combineReducers({
  rewardWidget: rewardWidgetSlice,
});
const store = configureStore({
  reducer,
});
export default store;
