import axios from "axios";
import type { AxiosInstance } from "axios";
import { baseUrl } from "./url";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: undefined,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;",
    crossDomain: true,
  },
});

axiosInstance.interceptors.request.use(async (config: any) => {
  return Promise.resolve(config);
});

axiosInstance.interceptors.response.use(
  function onSuccessApi(response: any) {
    return response;
  },

  function onErrorApi(error: any) {
    if (
      typeof error?.response?.data == "object" &&
      error?.response?.status === 400
    ) {
      let message = "";
      for (const key in error?.response?.data) {
        if (Object.prototype.hasOwnProperty.call(error?.response?.data, key)) {
          const element = error?.response?.data[key];
          if (typeof element == "string") {
            message += `${element}.`;
          }
        }
      }
    } else if (
      (error?.response?.status === 500 ||
        error?.response?.status === 403 ||
        error?.response?.status === 422) &&
      error?.response?.data?.message
    ) {
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
