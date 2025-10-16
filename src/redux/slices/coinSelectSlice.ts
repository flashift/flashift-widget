import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Coin } from "../../interface";

interface CoinSelectState {
  coinData: Coin[];
}

const initialState: CoinSelectState = {
  coinData: [
    {
      id: "btcBTC",
      symbol: "btc",
      fullname: "Bitcoin",
      network: "btc",
      uuid: "Qwsogvtv82FCd",
      image: "https://static.flashift.app/image/coin/Qwsogvtv82FCd/btc.svg",
      marketCap: 2116332629682,
      contractAddresses: [],
    },
    {
      id: "ethETH",
      symbol: "eth",
      fullname: "Ethereum",
      network: "eth",
      uuid: "razxDUgYGNAdQ",
      image: "https://static.flashift.app/image/coin/razxDUgYGNAdQ/eth.svg",
      marketCap: 475520081118,
      contractAddresses: [],
    },
  ],
};

export const coinSelectSlice = createSlice({
  name: "coinSelectSlice",
  initialState,
  reducers: {
    setFromCoinSelectData: (state, action: PayloadAction<Coin>) => {
      state.coinData[0] = action.payload;
    },
    setToCoinSelectData: (state, action: PayloadAction<Coin>) => {
      state.coinData[1] = action.payload;
    },
  },
});

export const { setFromCoinSelectData, setToCoinSelectData } =
  coinSelectSlice.actions;

export default coinSelectSlice.reducer;
