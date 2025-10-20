import axios from "axios";

export const priceService = (uuid: string | undefined) =>
  axios.get(`https://fly-service-price.flashift.app/price/?UUID=${uuid}/`, {
    withCredentials: true,
    headers: {
      "X-API-KEY":
        "8d0dd07a-2d86-42ef-b664-7051ae7584b92222e400-a69d-44ae-8a40",
    },
  });
