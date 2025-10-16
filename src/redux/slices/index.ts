import { combineReducers } from "@reduxjs/toolkit";
import coinFromValueSlice from "./coinFromValueSlice";
import coinSelectSlice from "./coinSelectSlice";
import exchangeResSlice from "./exchangeResSlice";
import netIconSlice from "./netIconSlice";

const rootReducer = combineReducers({
  coinSelect: coinSelectSlice,
  coinFromValue: coinFromValueSlice,
  exchangeRes: exchangeResSlice,
  netIcon: netIconSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
