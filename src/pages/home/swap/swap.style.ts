import type { SxProps } from "@mui/material";

export const wrapperMain: SxProps = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  "& .swap_button": {
    width: "100px",
    marginLeft: "13px",
    marginTop: "3.5px",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: "700",
    height: "50px",
  },
  ".all_fees": {
    color: "#FF9800",
    fontSize: "1.3rem",
    position: "relative",
    top: "7px",
    left: "10px",
  },
  "input::placeholder": {
    color: "rgba(255,255,255,0.4)",
    fontSize: "1.34rem",
  },
};

export const wrapperSwap: SxProps = {
  width: "100%",
  "&>div": {
    display: "flex",
  },
  "& h6": {
    fontWeight: "700",

    "& img": {
      height: "20px",
      position: "relative",
      top: "4px",
      marginRight: "10px",
    },
  },
  "& div img": {
    borderRadius: "50%",
  },
};

export const wrapperIcons: SxProps = {
  position: "absolute",
  top: "-33px",
  right: "0",
  height: "33px",
  width: "186px",
  textAlign: "right",
  background: "url(assets/images/swap/swapptn.svg) no-repeat center center",
};

export const wrapperSwapItem: SxProps = {
  border: "1px solid #ffffff",
  padding: "0 5px",
  position: "relative",
  borderRadius: "8px",
  flex: "1 0 40%",
  "& span": {
    fontSize: "1.1rem",
    position: "absolute",
    top: "-13px",
    background: "rgb(51, 61, 107)",
    padding: "0 5px",
  },
  "@media (max-width: 998px)": { marginBottom: "0" },
};

export const wrapperChange: SxProps = {
  display: "flex",
  justifyContent: "center",
  height: "58px",
  "& button": {
    margin: "0 20px",
  },
  "& img": {
    zIndex: 1,
    transform: "rotate(90deg)",
  },
};

export const wrapperSwapInfo: SxProps = {
  justifyContent: "space-between",
  flexWrap: "unset",
  "& input": {
    width: "100%",
    height: "56px",
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#ffffff",
    textAlign: "right",
    paddingTop: "10px",
    fontSize: "19px",
    fontWeight: "700",
  },
  "&>div:first-of-type": {
    borderRadius: "8px",
    padding: "5px 10px",
    position: "relative",
    height: "50px",
    top: "4px",
    "&>svg": {
      position: "absolute",
      right: "10px",
      top: "17px",
    },
  },
  "@media (max-width: 520px)": {
    display: "unset",
    "& input": {
      textAlign: "left",
    },
  },
};

export const wrapperCoin: SxProps = {
  "& h6": {
    fontWeight: "700",
  },
  "& p": {
    fontSize: "1rem",
    opacity: "0.7",
  },
};

export const wrapperLoading: SxProps = {
  "& .loader img": {
    width: "30px",
    height: "30px",
    animation: "spin 0.8s linear infinite",
    position: "absolute",
    right: "15px",
    top: "13px",
  },

  "@keyframes spin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },
};
