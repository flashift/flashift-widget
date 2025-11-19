import { Button, IconButton, Typography, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState, type FC } from "react";
import CustomCard from "../../../components/card";
import net from "../../../data/network.json";
import {
  wrapperChange,
  wrapperCoin,
  wrapperLoading,
  wrapperMain,
  wrapperSwap,
  wrapperSwapInfo,
  wrapperSwapItem,
} from "./swap.style";
import useAppSelector from "../../../hooks/useSelector";
import useAppDispatch from "../../../hooks/useDispatch";
import { setFromValueData } from "../../../redux/slices/coinFromValueSlice";
import { setExchangeResData } from "../../../redux/slices/exchangeResSlice";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  setNetIconFromData,
  setNetIconToData,
} from "../../../redux/slices/netIconSlice";

import { useLocation, useNavigate } from "react-router-dom";
import { baseImageUrl } from "../../../config/imageUrl";
import { logSwapButtonClick } from "../../../analytics";

interface IProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  handleChange: any;
  setActive: (active: number) => void;
}

const Swap: FC<IProps> = ({ loading, setLoading, handleChange, setActive }) => {
  const [fromValue, setFromValue] = useState("");

  const dispatch = useAppDispatch();
  const { coinData } = useAppSelector((state) => state.coinSelect);
  const { netIconFrom } = useAppSelector((state) => state.netIcon);
  const { netIconTo } = useAppSelector((state) => state.netIcon);
  const [rateChange, setRateChange] = useState(true);
  const exchangeResData = useAppSelector((state) => state.exchangeRes);
  const isMobileActive = useMediaQuery("(max-width: 1006px)");
  const location = useLocation();
  const navigate = useNavigate();

  const fromValueData = useAppSelector(
    (state) => state.coinFromValue.fromValue
  );

  const handleSwap = () => {
    dispatch(setNetIconFromData(""));
    dispatch(setNetIconToData(""));
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
    logSwapButtonClick();

    window.open(
      `https://exchangev3.flashift.app/?symbol_to=${coinData[1]?.symbol}&network_to=${coinData[1]?.network}&symbol_from=${coinData[0]?.symbol}&network_from=${coinData[0]?.network}&amount=${fromValueData}
`,
      "_blank"
    );
  };

  const handleRateChange = () => {
    setRateChange(!rateChange);
  };

  return (
    <Grid sx={wrapperMain}>
      <CustomCard>
        <Grid sx={wrapperSwap}>
          <Typography variant="h6" mb={2}>
            <img src="/assets/images/logo.svg" alt="flashifttWidget" />
            AI-driven , Best rate , lowest fees , Registration-free
          </Typography>
          <Grid mb={1}>
            <Grid sx={wrapperSwapItem}>
              <span>From</span>
              <Grid container sx={wrapperSwapInfo} gap={2}>
                <Grid
                  sx={{
                    background: (theme) => theme?.palette?.secondary?.light,
                    minWidth: "95px",
                    width: "fit-content",
                  }}
                  className="coin-box"
                  onClick={() => handleSwap()}
                >
                  <Grid container>
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
                        width="35px"
                        height="35px"
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
            <Grid sx={wrapperSwapItem} className="toWrapper">
              <span>To</span>
              <Grid container sx={wrapperSwapInfo} gap={2}>
                <Grid
                  sx={{
                    background: (theme) => theme?.palette?.secondary?.light,
                    minWidth: "95px",
                    width: "fit-content",
                  }}
                  className="coin-box"
                  onClick={() => handleSwap()}
                >
                  <Grid container>
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
                        width="35px"
                        height="35px"
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
                </Grid>
                <Grid sx={wrapperLoading}>
                  {loading ? (
                    <Grid className="loader">
                      <img src="/assets/images/loading.svg" alt="flashift" />
                    </Grid>
                  ) : (
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
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              fullWidth
              onClick={handleExchange}
              className="swap_button"
            >
              Swap
            </Button>
          </Grid>
          {!loading &&
            exchangeResData &&
            exchangeResData?.exchangeRes?.data &&
            exchangeResData?.exchangeRes?.data.length > 0 && (
              <Grid
                sx={{
                  fontSize: "1.2rem",
                  justifyContent: "left",
                }}
                className="animate__animated animate__fadeIn"
                container
              >
                <Grid>
                  {rateChange ? (
                    <>
                      {" "}
                      1 {coinData[0]?.symbol.toUpperCase()}
                      <IconButton onClick={handleRateChange}>
                        <img
                          src="./assets/images/swap/rateChange.svg"
                          alt="flashift"
                          style={{ transform: "rotate(90deg)" }}
                        />
                      </IconButton>
                      {""}
                      {(
                        Number(exchangeResData?.exchangeRes?.max_amount) /
                        Number(fromValueData)
                      ).toFixed(8) === "0.00000000"
                        ? (
                            Number(exchangeResData?.exchangeRes?.max_amount) /
                            Number(fromValueData)
                          ).toFixed(16)
                        : (
                            Number(exchangeResData?.exchangeRes?.max_amount) /
                            Number(fromValueData)
                          ).toFixed(8)}
                      {""} {coinData[1]?.symbol.toUpperCase()}
                    </>
                  ) : (
                    <>
                      {" "}
                      1 {coinData[1]?.symbol.toUpperCase()}
                      <IconButton onClick={handleRateChange}>
                        <img
                          src="./assets/images/swap/rateChange.svg"
                          alt="flashift"
                          style={{ transform: "rotate(90deg)" }}
                        />
                      </IconButton>
                      {""}
                      {(
                        Number(fromValueData) /
                        Number(exchangeResData?.exchangeRes?.max_amount)
                      ).toFixed(8) === "0.00000000"
                        ? (
                            Number(fromValueData) /
                            Number(exchangeResData?.exchangeRes?.max_amount)
                          ).toFixed(16)
                        : (
                            Number(fromValueData) /
                            Number(exchangeResData?.exchangeRes?.max_amount)
                          ).toFixed(8)}
                      {""} {coinData[0]?.symbol.toUpperCase()}
                    </>
                  )}
                </Grid>
                <Grid className="all_fees" container>
                  <ErrorOutlineIcon style={{ width: "17px" }} />
                  <span
                    style={{
                      position: "relative",
                      top: "-2.5px",
                      marginLeft: "3px",
                    }}
                  >
                    All Fees Included
                  </span>
                </Grid>
              </Grid>
            )}
        </Grid>
      </CustomCard>
    </Grid>
  );
};
export default Swap;
