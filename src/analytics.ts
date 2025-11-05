// src/analytics.js
import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-T27Q59KP6Z");
};

export const logSwapButtonClick = () => {
  ReactGA.event("click_widget_swap_button", {
    event_category: "Swap",
    event_label: "User clicked the swap button",
  });
};