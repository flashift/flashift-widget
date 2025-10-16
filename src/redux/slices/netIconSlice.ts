import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface NetIconeState {
  netIconFrom: string;
  netIconTo: string;
}

const initialState: NetIconeState = {
  netIconFrom: "",
  netIconTo: "",
};

export const netIconSlice = createSlice({
  name: "netIconSlice",
  initialState,
  reducers: {
    setNetIconFromData: (state, action: PayloadAction<string>) => {
      state.netIconFrom = action.payload;
    },
    setNetIconToData: (state, action: PayloadAction<string>) => {
      state.netIconTo = action.payload;
    },
  },
});

export const { setNetIconFromData, setNetIconToData } = netIconSlice.actions;

export default netIconSlice.reducer;
