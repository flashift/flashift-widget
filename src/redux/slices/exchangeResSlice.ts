import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { ExchangeRes } from "../../interface";

interface ExchangeResState {
  exchangeRes: ExchangeRes | undefined;
}

const initialState: ExchangeResState = {
  exchangeRes: {
    rate_id: "",
    max_amount: "",
    min_amount: "",
    message: "",
    data: [],
  },
};

export const exchangeResSlice = createSlice({
  name: "ExchangeResSlice",
  initialState,
  reducers: {
    setExchangeResData: (
      state,
      action: PayloadAction<ExchangeRes | undefined>
    ) => {
      state.exchangeRes = action.payload;
    },
  },
});

export const { setExchangeResData } = exchangeResSlice.actions;

export default exchangeResSlice.reducer;
