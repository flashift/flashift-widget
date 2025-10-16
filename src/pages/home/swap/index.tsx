import { Button, IconButton, Typography, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState, type FC } from "react";
import CustomCard from "../../../components/card";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import net from "../../../data/network.json";
import {
  wrapperChange,
  wrapperCoin,
  wrapperMain,
  wrapperSwap,
  wrapperSwapInfo,
  wrapperSwapItem,
} from "./swap.style";
import useAppSelector from "../../../hooks/useSelector";
import useAppDispatch from "../../../hooks/useDispatch";
import { setFromValueData } from "../../../redux/slices/coinFromValueSlice";
import { setExchangeResData } from "../../../redux/slices/exchangeResSlice";

import {
  setNetIconFromData,
  setNetIconToData,
} from "../../../redux/slices/netIconSlice";

import { useLocation, useNavigate } from "react-router-dom";
import { baseImageUrl } from "../../../config/imageUrl";

interface IProps {
  setSwitch: (arg0: number) => void;
  setCoinType: (arg0: number | undefined) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  swapDetail: boolean;
  setSwapDetail: (swapDetail: boolean) => void;
  handleChange: any;
  active: number;
  setActive: (active: number) => void;
  showWallet: boolean;
  setShowWallet: (showWallet: boolean) => void;
  confirm: boolean;
  setConfirm: (confirm: boolean) => void;
  historyRequestId: string;
  setHistoryRequestId: (historyRequestId: string) => void;
  price: any;
  setPrice: any;
  timer: any;
  loadingSkeleton: boolean;
  errorMessage: boolean;
}

const Swap: FC<IProps> = ({
  setSwitch,
  setCoinType,
  setLoading,
  handleChange,
  setActive,
}) => {
  const [fromValue, setFromValue] = useState("");

  const dispatch = useAppDispatch();
  const { coinData } = useAppSelector((state) => state.coinSelect);
  const { netIconFrom } = useAppSelector((state) => state.netIcon);
  const { netIconTo } = useAppSelector((state) => state.netIcon);

  const exchangeResData = useAppSelector((state) => state.exchangeRes);
  const isMobileActive = useMediaQuery("(max-width: 1006px)");
  const location = useLocation();
  const navigate = useNavigate();

  const fromValueData = useAppSelector(
    (state) => state.coinFromValue.fromValue
  );

  const handleSwap = (id: number) => {
    setSwitch(2);
    dispatch(setNetIconFromData(""));
    dispatch(setNetIconToData(""));
    if (id === 1) {
      setCoinType(1);
    } else if (id === 2) {
      setCoinType(2);
    }
  };

  const handleFromValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9]*(\.)?[0-9]*$/;
    if (re.test(e.target.value)) {
      setLoading(true);
      setActive(0);
      dispatch(setExchangeResData());
      setFromValue(e.target.value);
      dispatch(setFromValueData(e.target.value));
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("amount", e.target.value);
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    } else {
      return false;
    }
  };

  const handleExchange = () => {
    window.open(
      `https://exchange.flashift.app/?symbol_to=${coinData[1]?.symbol}&network_to=${coinData[1]?.network}&symbol_from=${coinData[0]?.symbol}&network_from=${coinData[0]?.network}&amount=${fromValueData}
`,
      "_blank"
    );
  };

  return (
    <Grid sx={wrapperMain}>
      <CustomCard>
        <Grid sx={wrapperSwap}>
          <Typography variant="h4" mb={4}>
            Exchange Crypto
          </Typography>
          <Grid>
            <Grid sx={wrapperSwapItem} mb={2}>
              <span>From</span>
              <Grid container sx={wrapperSwapInfo} gap={2}>
                <Grid
                  sx={{
                    background: (theme) => theme?.palette?.secondary?.light,
                    minWidth: "160px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSwap(1)}
                >
                  <Grid container pr={3}>
                    <Grid mr={1} style={{ position: "relative" }}>
                      <img
                        src={
                          coinData[0]?.image
                            ? coinData[0].image.startsWith("http")
                              ? coinData[0].image
                              : `${baseImageUrl}/${coinData[0].image}`
                            : "./assets/images/coins/noPic.svg"
                        }
                        alt="flashift"
                        width="42px"
                        height="42px"
                      />
                      <img
                        alt="flashift"
                        src={
                          netIconFrom
                            ? netIconFrom
                            : `${baseImageUrl}/${
                                net.filter(
                                  (item) =>
                                    item?.name.toUpperCase() ===
                                    coinData[0]?.network.toUpperCase()
                                )?.[0]?.image
                              }`
                        }
                        width="20px"
                        height="20px"
                        className="netIcon"
                        style={{ left: "28px" }}
                      />
                    </Grid>
                    <Grid sx={wrapperCoin}>
                      <Typography variant="h6">
                        {coinData[0]?.symbol?.toUpperCase()}
                      </Typography>
                      <Typography>
                        {net
                          .filter(
                            (item) =>
                              item?.name.toUpperCase() ===
                              coinData[0]?.network.toUpperCase()
                          )?.[0]
                          ?.name.toUpperCase()}
                      </Typography>
                    </Grid>
                  </Grid>
                  <ExpandMoreIcon />
                </Grid>
                <Grid>
                  <input
                    type="text"
                    value={fromValueData ? fromValueData : fromValue}
                    onChange={(event) => handleFromValue(event)}
                    autoComplete="off"
                    inputMode="decimal"
                    placeholder={isMobileActive ? "Enter an Amount" : ""}
                    autoFocus
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid sx={wrapperChange}>
              <IconButton onClick={handleChange}>
                <img src="./assets/images/swap/change.svg" alt="flashift" />
              </IconButton>
            </Grid>
            <Grid sx={wrapperSwapItem} mb={2}>
              <span>To</span>
              <Grid container sx={wrapperSwapInfo} gap={2}>
                <Grid
                  sx={{
                    background: (theme) => theme?.palette?.secondary?.light,
                    minWidth: "160px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSwap(2)}
                >
                  <Grid container pr={3}>
                    <Grid mr={1} style={{ position: "relative" }}>
                      <img
                        src={
                          coinData[1]?.image
                            ? coinData[1].image.startsWith("http")
                              ? coinData[1].image
                              : `${baseImageUrl}/${coinData[1].image}`
                            : "./assets/images/coins/noPic.svg"
                        }
                        alt="flashift"
                        width="42px"
                        height="42px"
                      />
                      <img
                        alt="flashift"
                        src={
                          netIconTo
                            ? netIconTo
                            : `${baseImageUrl}/${
                                net.filter(
                                  (item) =>
                                    item?.name.toUpperCase() ===
                                    coinData[1]?.network.toUpperCase()
                                )?.[0]?.image
                              }`
                        }
                        width="20px"
                        height="20px"
                        className="netIcon"
                        style={{ left: "28px" }}
                      />
                    </Grid>
                    <Grid sx={wrapperCoin}>
                      <Typography variant="h6">
                        {coinData[1]?.symbol?.toUpperCase()}
                      </Typography>
                      <Typography>
                        {net
                          .filter(
                            (item) =>
                              item?.name.toUpperCase() ===
                              coinData[1]?.network.toUpperCase()
                          )?.[0]
                          ?.name.toUpperCase()}
                      </Typography>
                    </Grid>
                  </Grid>
                  <ExpandMoreIcon />
                </Grid>
                <Grid>
                  <input
                    value={
                      exchangeResData?.exchangeRes &&
                      ((fromValue && fromValue !== "0") ||
                        (fromValueData && fromValueData !== "0")) &&
                      !!exchangeResData?.exchangeRes?.max_amount &&
                      exchangeResData?.exchangeRes?.max_amount !== "-1"
                        ? exchangeResData?.exchangeRes?.data?.[0]?.amount.toFixed(
                            5
                          )
                        : ""
                    }
                    type="text"
                    readOnly
                  />
                </Grid>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              fullWidth
              onClick={handleExchange}
              className="swap_button"
            >
              Exchange
            </Button>
          </Grid>
        </Grid>
      </CustomCard>
    </Grid>
  );
};
export default Swap;
