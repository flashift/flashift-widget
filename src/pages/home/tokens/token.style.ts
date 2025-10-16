import type { SxProps } from "@mui/material";

export const wrapperMain: SxProps = {
  "&>div": {
    width: "478px",
    maxWidth: "100%",
    margin: "0 auto",
  },
  "& .coin-row": {
    display: "flex",
    justifyContent: "flex-start",
    cursor: "pointer",
    borderRadius: "8px",
    padding: "0 8px",
    "& span": {
      fontSize: "0.7rem",
      opacity: "0.7",
    },
    "&:hover": {
      background: "rgba(60,70,119,0.9)",
    },
    "& p": {
      fontWeight: "700",
      margin: "13px 5px",
    },
    "&>div": {
      position: "relative",
    },
  },
  "& .coin-icon": {
    width: "32px",
    height: "32px",
  },
  "& .selected": {
    background: "rgba(60,70,119,0.9)",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  "& img": {
    borderRadius: "50%",
  },
  "@media (max-width: 1006px)": {
    "&>div": {
      height: "100%",
    },
  },
};
export const wrapperToken: SxProps = {
  display: "flex",
  justifyContent: "center",
  "& h5": {
    fontWeight: "700",
  },
  "& button": {
    position: "absolute",
    color: "#ffffff",
    top: "28px",
    left: "13px",
  },
};

export const wrapperInput: SxProps = {
  position: "relative",
  "& label": {
    position: "absolute",
    top: "-11px",
    left: "12px",
    fontSize: "1.1rem",
    background: "#1a2233",
    zIndex: "1",
    padding: "0 5px",
  },
};

export const wrapperRight: SxProps = {
  minHeight: "344px",
  "&>div:first-of-type": {
    justifyContent: "space-between",
    borderBottom: "0.5px solid",
  },
  "& p": {
    margin: "0 5px !important",
  },
};
export const wrapperLeft: SxProps = {
  "&>div:last-of-type": {
    height: "260px",
    overflowY: "scroll",
    overflowX: "hidden",
  },
  "@media (max-width: 1006px)": {
    "&>div:last-of-type": {
      height: "320px",
    },
  },
};
