import { AxiosRequestConfig } from "axios";

export const buildHeader = (): AxiosRequestConfig<Headers> => {
  const headers: AxiosRequestConfig<Headers> = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  return headers;
};

export const buildAuthHeader = (): AxiosRequestConfig<Headers> => {
  const headers: AxiosRequestConfig<Headers> = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  return headers;
};
