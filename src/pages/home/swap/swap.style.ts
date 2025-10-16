import type { SxProps } from "@mui/material";

export const wrapperMain: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  flexWrap: "wrap",
  overflowY: "hidden",
  height: "calc(100vh - 149px)",
  padding: "65px 10px",
  ".all_fees": {
    color: "#FF9800",
    fontSize: "1.3rem",
    width: "100%",
  },
  "input::placeholder": {
    color: "rgba(255,255,255,0.4)",
    fontSize: "1.34rem",
  },
  "&>div:first-of-type": {
    borderRadius: "8px 0 0 8px",
    width: "488px",
    maxWidth: "100%",
    marginBottom: "50px",
  },
  "@media (max-width: 1200px)": {
    overflowY: "scroll",
  },
  "@media (max-width: 1006px)": {
    padding: "48px 10px",
    height: "calc(100vh - 120px)",
    width: "100vw",
    display: "inline-block",
    ".rate": {
      marginBottom: "0",
      paddingTop: "0",
      paddingBottom: "0",
      "&>div": {
        padding: "0",
      },
      "&>p": {
        paddingTop: "8px",
      },
    },
    "&>div:first-of-type": {
      borderRadius: "8px 0 8px 8px",
    },
    "&>div": {
      margin: "0 auto",
    },
    "& .swap_button": {
      position: "fixed",
      left: "0",
      bottom: "20px",
      zIndex: "10",
      right: "0",
      width: "100%",
      borderRadius: "8px",
      padding: "25px 5px",
      fontSize: "1.35rem",
      fontWeight: "700",
    },
  },
  "@media (max-width: 900px)": {
    padding: "48px 10px",
  },
};

export const wrapperSwap: SxProps = {
  "& h4": {
    fontWeight: "700",
    fontSize: "1.7rem",
  },
  "& img": {
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
  padding: "10px 15px",
  position: "relative",
  borderRadius: "8px",
  "& span": {
    fontSize: "1.1rem",
    position: "absolute",
    top: "-13px",
    background: "#333d6b",
    padding: "0 5px",
  },
};

export const wrapperChange: SxProps = {
  position: "absolute",
  top: "115px",
  width: "94%",
  textAlign: "center",
  "& img": {
    zIndex: 1,
  },
  "@media (max-width: 520px)": {
    top: "173px",
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
    fontSize: "23px",
    fontWeight: "700",
  },
  "&>div:first-of-type": {
    borderRadius: "8px",
    padding: "10px",
    position: "relative",
    height: "59px",
    "&>svg": {
      position: "absolute",
      right: "10px",
      top: "22px",
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
