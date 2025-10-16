import CustomCard from "../../../components/card";
import coins from "../../../data/coinList.json";
import net from "../../../data/network.json";
import TrieData from "../../../data/trieData.json";
import { IconButton, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  wrapperInput,
  wrapperLeft,
  wrapperMain,
  wrapperRight,
  wrapperToken,
} from "./token.style";
import { AutoSizer, List } from "react-virtualized";
import type { ListRowRenderer } from "react-virtualized";
import { useEffect, useState, type FC } from "react";
import useAppDispatch from "../../../hooks/useDispatch";
import {
  setFromCoinSelectData,
  setToCoinSelectData,
} from "../../../redux/slices/coinSelectSlice";
import { setExchangeResData } from "../../../redux/slices/exchangeResSlice";
import useAppSelector from "../../../hooks/useSelector";
import {
  setNetIconFromData,
  setNetIconToData,
} from "../../../redux/slices/netIconSlice";
import { useLocation, useNavigate } from "react-router-dom";
import type { Coin, Net } from "../../../interface";
import { baseImageUrl } from "../../../config/imageUrl";

import coinManager from "flashift-coin-search";
coinManager.loadCoinTrie(TrieData);

interface IProps {
  setSwitch: (arg0: number) => void;
  coinType: number | undefined;
  setLoading: (arg0: boolean) => void;
  setActive: (arg0: number) => void;
  setPrice: any;
}

const Tokens: FC<IProps> = ({ setSwitch, coinType, setLoading, setActive }) => {
  const [netList, setNetList] = useState<Net[]>(net);
  const dispatch = useAppDispatch();
  const [filterCoins, setFilterCoins] = useState(coins);
  const [searchNet, setSearchNet] = useState("");
  const [selectedNet, setSelectedNet] = useState("selected");
  const [searchSymbol, setSearchSymbol] = useState("");
  const { netIconFrom } = useAppSelector((state) => state.netIcon);
  const { netIconTo } = useAppSelector((state) => state.netIcon);
  const location = useLocation();
  const navigate = useNavigate();

  const rowRendererToken: ListRowRenderer = ({ key, index, style }) => {
    const coin: Coin = filterCoins[index];
    const netIcon = `${baseImageUrl}/${
      net.filter(
        (item) => item?.name.toUpperCase() === coin.network.toUpperCase()
      )?.[0]?.image
    }`;
    if (coinType === 1) {
      return (
        <Grid
          key={key}
          style={style}
          className="coin-row"
          onClick={() => handleToken(index)}
        >
          <Grid container pt={0.7}>
            {coin?.image ? (
              <img
                src={`${baseImageUrl}/${coin.image}`}
                alt="flashift"
                className="coin-icon"
              />
            ) : (
              <img
                src="./assets/images/coins/noPic.svg"
                alt="flashift"
                className="coin-icon"
              />
            )}

            <img
              alt="flashift"
              src={netIconFrom ? netIconFrom : netIcon}
              width="15.5px"
              height="15.5px"
              className="netIcon"
            />
            <Typography>
              {coin?.symbol.toUpperCase()}{" "}
              <span className="net_wrapper">
                {netIconFrom
                  ? net
                      .filter(
                        (item) =>
                          `${baseImageUrl}/${item.image}` === netIconFrom
                      )?.[0]
                      ?.name.toUpperCase()
                  : net
                      .filter(
                        (item) => `${baseImageUrl}/${item.image}` === netIcon
                      )?.[0]
                      ?.name.toUpperCase()}
              </span>
              <br />
              <span>{coin?.fullname}</span>
            </Typography>
          </Grid>
        </Grid>
      );
    } else if (coinType === 2) {
      return (
        <Grid
          key={key}
          style={style}
          className="coin-row"
          onClick={() => handleToken(index)}
        >
          <Grid container pt={0.7}>
            {coin?.image ? (
              <img
                src={`${baseImageUrl}/${coin.image}`}
                alt="flashift"
                className="coin-icon"
              />
            ) : (
              <img
                src="./assets/images/coins/noPic.svg"
                alt="flashift"
                className="coin-icon"
              />
            )}
            <img
              alt="flashift"
              src={netIconTo ? netIconTo : netIcon}
              width="15.5px"
              height="15.5px"
              className="netIcon"
            />

            <Typography>
              {coin?.symbol.toUpperCase()}
              <span className="net_wrapper">
                {netIconTo
                  ? net
                      .filter(
                        (item) => `${baseImageUrl}/${item.image}` === netIconTo
                      )?.[0]
                      ?.name.toUpperCase()
                  : net
                      .filter(
                        (item) => `${baseImageUrl}/${item.image}` === netIcon
                      )?.[0]
                      ?.name.toUpperCase()}
              </span>
              <br />
              <span>{coin?.fullname}</span>
            </Typography>
          </Grid>
        </Grid>
      );
    }
  };

  const handleNetSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchNet(e.target.value.toUpperCase());
  };

  const handleSelectNet = (net: string, icon: string) => {
    setSelectedNet(net);
    if (coinType === 1) {
      dispatch(setNetIconFromData(icon));
    } else if (coinType === 2) {
      dispatch(setNetIconToData(icon));
    }
    if (searchSymbol) {
      const coinManagerSuggest = coinManager.suggest(
        searchSymbol.toLowerCase(),
        net.toLowerCase()
      );
      setFilterCoins(
        coins.filter((item) => coinManagerSuggest.includes(item.id))
      );
    } else {
      setFilterCoins(
        coins.filter((item) => item.network.toUpperCase() === net.toUpperCase())
      );
    }
  };

  useEffect(() => {
    if (searchNet === "") {
      setNetList(net);
    } else {
      const netFilter = [...net].filter((item) =>
        item.name.toUpperCase().includes(searchNet)
      );
      setNetList(netFilter);
    }
  }, [searchNet]);

  const handleAllNet = () => {
    setSearchNet("");
    setSelectedNet("selected");
    dispatch(setNetIconFromData(""));
    dispatch(setNetIconToData(""));
    setNetList(net);

    if (searchSymbol) {
      const coinManagerSuggest = coinManager.suggest(
        searchSymbol.toLowerCase()
      );
      setFilterCoins(
        coins.filter((item) => coinManagerSuggest.includes(item.id))
      );
    } else {
      setFilterCoins(coins);
    }
  };

  const handleSymbolSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchSymbol(e.target.value.toUpperCase());
  };

  const handleToken = (index: number) => {
    setSwitch(1);
    setActive(0);
    setLoading(true);
    dispatch(setExchangeResData());
    if (coinType === 1) {
      const selectedCoin = {
        ...filterCoins[index],
        image: `${baseImageUrl}/${filterCoins[index].image}`,
      };
      dispatch(setFromCoinSelectData(selectedCoin));
      dispatch(
        setNetIconFromData(
          `${baseImageUrl}/${
            net.filter(
              (item) => item?.name === filterCoins[index]?.network
            )?.[0]?.image
          }`
        )
      );

      const searchParams = new URLSearchParams(location.search);
      searchParams.set("symbol_from", filterCoins[index].symbol);
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });

      searchParams.set(
        "network_from",
        net.filter((item) => item?.name === filterCoins[index]?.network)?.[0]
          ?.name
      );
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    } else if (coinType === 2) {
      const selectedCoin = {
        ...filterCoins[index],
        image: `${baseImageUrl}/${filterCoins[index].image}`,
      };
      dispatch(setToCoinSelectData(selectedCoin));
      dispatch(
        setNetIconToData(
          `${baseImageUrl}/${
            net.filter(
              (item) => item?.name === filterCoins[index]?.network
            )?.[0]?.image
          }`
        )
      );

      const searchParams = new URLSearchParams(location.search);
      searchParams.set("symbol_to", filterCoins[index].symbol);
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
      searchParams.set(
        "network_to",
        net.filter((item) => item?.name === filterCoins[index]?.network)?.[0]
          ?.name
      );
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    }
  };

  useEffect(() => {
    const filteredByNet =
      selectedNet !== "selected"
        ? coins.filter(
            (item) => item.network.toUpperCase() === selectedNet.toUpperCase()
          )
        : coins;
    const rawSuggest = coinManager.suggest(searchSymbol.toLowerCase());
    const coinManagerSuggest = Array.isArray(rawSuggest) ? rawSuggest : [];

    const finalFilteredCoins = searchSymbol.trim()
      ? filteredByNet.filter((item) => coinManagerSuggest.includes(item.id))
      : filteredByNet;

    setFilterCoins(finalFilteredCoins);
  }, [searchSymbol, selectedNet]);

  const handleBack = () => {
    setSwitch(1);
    dispatch(setNetIconFromData(""));
    dispatch(setNetIconToData(""));
  };

  return (
    <Grid
      sx={wrapperMain}
      className="animate__animated animate__fadeIn fix_layout"
    >
      <CustomCard>
        <Grid sx={wrapperToken} mt={2}>
          <IconButton onClick={handleBack}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h5">Select Network & Token</Typography>
        </Grid>
        <Grid my={3} sx={wrapperInput}>
          <label>Search</label>
          <TextField
            fullWidth
            placeholder="Type any token network, name, symbol or a combination"
            value={searchSymbol}
            onChange={handleSymbolSearch}
            variant="outlined"
            autoComplete="off"
            autoFocus
          />
        </Grid>
        <Grid container style={{ justifyContent: "space-between" }}>
          <Grid
            size={{ xs: 5 }}
            sx={wrapperLeft}
            style={{ borderRight: "0.5px solid" }}
            pr={2}
          >
            <Typography variant="h6" mb={2}>
              Network
            </Typography>
            <TextField
              fullWidth
              placeholder="Filter..."
              value={searchNet}
              onChange={handleNetSearch}
              autoComplete="off"
            />
            <Grid mt={1.5}>
              <Grid
                className={`coin-row ${
                  selectedNet === "selected" ? "selected" : ""
                }`}
                onClick={handleAllNet}
              >
                <Typography>All</Typography>
              </Grid>
              {netList.map((item: Net, index: number) => {
                return (
                  <Grid
                    key={index}
                    className={`coin-row ${
                      selectedNet === item.name ? "selected" : ""
                    }`}
                    onClick={() =>
                      handleSelectNet(
                        item.name,
                        baseImageUrl + "/" + item?.image
                      )
                    }
                  >
                    <img
                      src={baseImageUrl + "/" + item?.image}
                      alt="flashift"
                      className="coin-icon"
                      style={{ marginTop: "7px" }}
                    />
                    <Typography>{item.name.toUpperCase()}</Typography>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid size={{ xs: 7 }} sx={wrapperRight} pl={2}>
            <Grid container>
              <Typography variant="h6" mb={2}>
                Token
              </Typography>
            </Grid>
            <Grid style={{ width: "100%", height: "85%" }} mt={1.5}>
              <AutoSizer>
                {({ width, height }) => (
                  <List
                    width={width}
                    height={height}
                    rowCount={filterCoins.length}
                    rowHeight={50}
                    rowRenderer={rowRendererToken}
                    scrollToIndex={0}
                  />
                )}
              </AutoSizer>
            </Grid>
          </Grid>
        </Grid>
      </CustomCard>
    </Grid>
  );
};

export default Tokens;
