import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface CoinFromValueState {
  fromValue: string;
}

const initialState: CoinFromValueState = {
  fromValue: "",
};

export const coinFromValueSlice = createSlice({
  name: "coinFromValueSlice",
  initialState,
  reducers: {
    setFromValueData: (state, action: PayloadAction<string>) => {
      state.fromValue = action.payload;
    },
  },
});

export const { setFromValueData } = coinFromValueSlice.actions;

export default coinFromValueSlice.reducer;
