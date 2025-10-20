import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import Layout from "../../components/layout";
import useAppDispatch from "../../hooks/useDispatch";
import useAppSelector from "../../hooks/useSelector";
import {
  setFromCoinSelectData,
  setToCoinSelectData,
} from "../../redux/slices/coinSelectSlice";
import { setExchangeResData } from "../../redux/slices/exchangeResSlice";
import Swap from "./swap";
import Tokens from "./tokens";
import { baseUrl } from "../../config/url";
import net from "../../data/network.json";

import { debounce } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import { setFromValueData } from "../../redux/slices/coinFromValueSlice";
import coins from "../../data/coinList.json";
import { baseImageUrl } from "../../config/imageUrl";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [swith, setSwitch] = useState(1);
  const [coinType, setCoinType] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [swapDetail, setSwapDetail] = useState(false);
  const [active, setActive] = useState<number>(0);
  const controllerRef = useRef<AbortController | null>(null);
  const dispatch = useAppDispatch();
  const { coinData } = useAppSelector((state) => state.coinSelect);
  const { netIconFrom } = useAppSelector((state) => state.netIcon);
  const { netIconTo } = useAppSelector((state) => state.netIcon);
  const [showWallet, setShowWallet] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [historyRequestId, setHistoryRequestId] = useState<string>("");
  const [price, setPrice] = useState<any>();
  const activeRef = useRef(active);

  const fromValueData = useAppSelector(
    (state) => state.coinFromValue.fromValue
  );

  const [errorMessage, setErrorMessage] = useState(false);
  const [timer, setTimer] = useState<number>(0);

  const handleChange = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("symbol_from", coinData[1]?.symbol);
    searchParams.set("symbol_to", coinData[0]?.symbol);

    const networkFrom =
      net.find((item) => item?.name === coinData[1]?.network)?.name || "";
    const networkTo =
      net.find((item) => item?.name === coinData[0]?.network)?.name || "";

    searchParams.set("network_from", networkFrom);
    searchParams.set("network_to", networkTo);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });

    if (fromValueData) {
      setLoading(true);
      setActive(0);
      dispatch(setExchangeResData());
    }
  };

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const fullExchange = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();
    setErrorMessage(false);

    const searchParams = new URLSearchParams(location.search);
    const search_symbol_from = searchParams.get("symbol_from");
    const search_network_from = searchParams.get("network_from");
    const search_symbol_to = searchParams.get("symbol_to");
    const search_network_to = searchParams.get("network_to");
    const search_amount = searchParams.get("amount");
    if (
      search_symbol_from &&
      search_symbol_to &&
      search_network_from &&
      search_network_to &&
      search_amount
    ) {
      dispatch(
        setFromCoinSelectData(
          coins.filter(
            (item) =>
              item?.symbol.toUpperCase() === search_symbol_from.toUpperCase() &&
              item?.network.toUpperCase() === search_network_from.toUpperCase()
          )?.[0]
        )
      );
      dispatch(
        setToCoinSelectData(
          coins.filter(
            (item) =>
              item?.symbol.toUpperCase() === search_symbol_to.toUpperCase() &&
              item?.network.toUpperCase() === search_network_to.toUpperCase()
          )?.[0]
        )
      );
      dispatch(setFromValueData(search_amount));
    }

    if (fromValueData && Number(fromValueData) > 0) {
      const params = {
        symbol_from: search_symbol_from
          ? search_symbol_from
          : coinData[0]?.symbol,
        network_from: search_network_from
          ? search_network_from
          : netIconFrom
          ? net.filter(
              (item) =>
                (item.image.startsWith("http")
                  ? item.image
                  : `${baseImageUrl}/${item.image}`) === netIconFrom
            )?.[0]?.name
          : net.filter(
              (item) =>
                item?.name.toUpperCase() === coinData[0]?.network.toUpperCase()
            )?.[0]?.name,
        symbol_to: search_symbol_to ? search_symbol_to : coinData[1]?.symbol,
        network_to: search_network_to
          ? search_network_to
          : netIconTo
          ? net.filter(
              (item) =>
                (item.image.startsWith("http")
                  ? item.image
                  : `${baseImageUrl}/${item.image}`) === netIconTo
            )?.[0]?.name
          : net.filter(
              (item) =>
                item?.name.toUpperCase() === coinData[1]?.network.toUpperCase()
            )?.[0]?.name,
        amount: fromValueData || search_amount || "",
      };
      axios
        .get(`${baseUrl}FullEstimatedExchangeAmount`, {
          signal: controllerRef.current.signal,
          params,
        })
        .then((response) => {
          if (activeRef.current === 0) {
            dispatch(setExchangeResData(response?.data));
          }
          setLoading(false);
          if (response?.data?.message !== "OK") {
            setErrorMessage(true);
          }
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log("Previous request canceled");
          } else if (error.name === "CanceledError") {
            console.log("Request was aborted");
          } else {
            console.error("Error:", error);
            setLoading(true);
            dispatch(setExchangeResData());
          }
        });
    }
  }, [fromValueData, coinData]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search_symbol_from = searchParams.get("symbol_from");
    const search_network_from = searchParams.get("network_from");
    const search_symbol_to = searchParams.get("symbol_to");
    const search_network_to = searchParams.get("network_to");
    const search_amount = searchParams.get("amount");

    const fromCoin = coins.find(
      (item) =>
        item.symbol.toLowerCase() === search_symbol_from?.toLowerCase() &&
        item.network.toLowerCase() === search_network_from?.toLowerCase()
    );

    const toCoin = coins.find(
      (item) =>
        item.symbol.toLowerCase() === search_symbol_to?.toLowerCase() &&
        item.network.toLowerCase() === search_network_to?.toLowerCase()
    );

    if (fromCoin) {
      dispatch(setFromCoinSelectData(fromCoin));
    }

    if (toCoin) {
      dispatch(setToCoinSelectData(toCoin));
    }

    if (search_amount) {
      dispatch(setFromValueData(search_amount));
    }
  }, [location.search, coins]);

  const startTimer = useCallback(() => {
    let currentProgress = 0;
    setTimer(0);
    const progressInterval = setInterval(() => {
      currentProgress += 100 / 60;
      setTimer(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(progressInterval);
      }
    }, 1000);

    return progressInterval;
  }, []);

  const debouncedFullExchange = useCallback(
    debounce(() => {
      fullExchange();
    }, 700),
    [fullExchange]
  );

  useEffect(() => {
    let progressInterval = startTimer();
    const intervalId = setInterval(() => {
      clearInterval(progressInterval);
      progressInterval = startTimer();
      debouncedFullExchange();
    }, 60000);

    if (!swapDetail) {
      debouncedFullExchange();
    } else {
      clearInterval(intervalId);
      setTimer(0);
    }
    return () => {
      clearInterval(intervalId);
      clearInterval(progressInterval);
      setTimer(0);
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      debouncedFullExchange.cancel();
    };
  }, [debouncedFullExchange, swapDetail, startTimer]);

  return (
    <Layout>
      {swith === 1 && (
        <Swap
          setSwitch={setSwitch}
          setCoinType={setCoinType}
          loading={loading}
          setLoading={setLoading}
          swapDetail={swapDetail}
          setSwapDetail={setSwapDetail}
          handleChange={handleChange}
          setActive={setActive}
          active={active}
          showWallet={showWallet}
          setShowWallet={setShowWallet}
          confirm={confirm}
          setConfirm={setConfirm}
          historyRequestId={historyRequestId}
          setHistoryRequestId={setHistoryRequestId}
          price={price}
          setPrice={setPrice}
          timer={timer}
          errorMessage={errorMessage}
        />
      )}
      {swith === 2 && (
        <Tokens
          setActive={setActive}
          setSwitch={setSwitch}
          coinType={coinType}
          setLoading={setLoading}
          setPrice={setPrice}
        />
      )}
    </Layout>
  );
};
export default Home;
