import store from "@/redux/store";
import { DataState } from "@/redux/types/types";
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
      // Accept: "application/json",
      "Content-Type": "application/json",
      // get token from redux store
      Authorization: `Bearer ${(store.getState().data as DataState).data.token}`,
    },
  };
  return headers;
};
