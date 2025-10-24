import { faIR as coreFa } from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";

export const palette = {
  orangeColor: {
    50: "#FF9800",
  },
  whiteColor: "#ffffff",
  grayColor: "#9CA3AF",
  greenColor: "#22C55E",
  greenTransparentColor: "#14532B",
  errorColor: "#EF4444",
  errorTransparentColor: "#450A0A",
  bluecolor: {
    50: "rgb(51, 61, 107)",
    100: "rgba(60, 70, 119, 0.9)",
  },
};

export const lightTheme = createTheme(
  {
    palette: {
      mode: "light",
      primary: {
        main: palette.orangeColor[50],
        light: palette.whiteColor,
        contrastText: palette.grayColor,
      },
      secondary: {
        main: palette.bluecolor[50],
        light: palette.bluecolor[100],
      },
      success: {
        main: palette.greenColor,
        light: palette.greenTransparentColor,
      },
      error: {
        main: palette.errorColor,
        light: palette.errorTransparentColor,
      },
    },
    typography: {
      fontFamily: '"Poppins", "Stretch", sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
  
        html {
          font-size: 12px;
        }
        body {
          color: #ffffff;
          background:linear-gradient(270deg, rgb(34, 14, 67) 0%, rgb(34, 64, 119) 100%) rgb(34, 63, 118);
          min-height: 100vh;
          margin: 0;
        }

        a {
          text-decoration: none;
        }
       button{
        text-transform: unset !important;
       }
       img{
         max-width:100%
       }
       .tabPanel{
        padding:24px 0 !important
       }
       .tabPanel .MuiPaper-root{
        background: rgba(61,70,115,0.4);
        color:#ffffff;
        box-shadow: none;
        border-radius: 8px;
        margin-bottom: 15px;
        padding:10px
      }
      .tabPanel svg{
       color:#ffffff
      }
      .tabPanel .MuiAccordionDetails-root  p{
        color:#9CA3AF
       }
       .MuiModal-hidden .MuiDrawer-paperAnchorLeft{
        transform: translateX(-240px) !important;
       }
       .MuiDrawer-paperAnchorLeft{
        transform: translateX(0) !important;
        transition: all 300ms !important;
       }
       textArea{
        width: 100%;
        border-radius: 10px;
        font-size: 0.93rem;
        color: #ffffff;
        height:44px;
        border-color: #ffffff;
        border-style: solid;
        background:none;
        padding:10px 14px
       }
      `,
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            background: palette.orangeColor[50],
            color: "#ffffff",
            borderRadius: "8px",
            boxShadow: "none",
            padding: "10px",
            fontSize: "1.2rem",
            height: "40px",
            "&.Mui-disabled": {
              background: "#FF98004D",
              color: "rgba(255,255,255,0.4)",
              "&>img": {
                opacity: "0.3",
              },
            },
            "&.MuiButton-sizeSmall": {
              height: "36px",
            },
            "&:hover": {
              "&.MuiButton-containedPrimary": {
                color: "#ffffff",
                background: palette.orangeColor[50],
                borderColor: palette.orangeColor[50],
                boxShadow: "1px 3px 18px 1px rgba(42,172,142,0.45)",
              },
            },
          },
          outlined: {
            color: palette.orangeColor[50],
            border: "1px solid" + palette.orangeColor[50],
            borderRadius: "8px",
            boxShadow: "none",
            padding: "10px",
            height: "40px",
            "&.MuiButton-sizeSmall": {
              height: "38px",
            },
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            color: "#ffffff",
            "& label": {
              color: "#ffffff",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-root": {
              width: "100%",
              borderRadius: "10px",
              fontSize: "0.93rem",
              color: "#ffffff",
              height: "44px",
              "& .MuiInputBase-input": {
                width: "100%",
                color: "#ffffff",
                borderColor: "#ffffff",
                borderStyle: "solid",
                borderRadius: "10px",
              },
              "& fieldset": {
                borderColor: "#ffffff !important",
              },
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            background:
              "linear-gradient(270deg, rgba(34, 55, 106, 1) 0%, rgb(33, 16, 67) 100%)",
            "& a": {
              color: "#ffffff",
            },
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            borderRadius: "8px !important",
            marginBottom: "10px",
            color: "#ffffff",
            background: "rgba(57,66,112,0.9)",
            "& svg": {
              color: "#ffffff",
            },
            "& .MuiAccordionSummary-content": {
              fontSize: "1.2rem",
              fontWeight: "700",
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            color: "#ffffff",
            fontSize: "1.1rem",
          },
        },
      },
      MuiCircularProgress: {
        styleOverrides: {
          root: {
            width: "27px !important",
            height: "27px !important",
            position: "relative",
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: "50%",
          },
        },
      },
    },
    direction: "rtl",
  },
  coreFa
);

export type lightThemeType = typeof lightTheme;
