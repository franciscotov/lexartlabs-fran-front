import { dataTypes } from "../ActionTypes/dataTypes";
import { FetchLoginUserRequest, FetchLoginUserSuccess, FetchLoginUserFailure } from "../types/types";

export const fetchDataUser = (): FetchLoginUserRequest => ({
  type: dataTypes.FETCH_LOGIN_USER_REQUEST,
});

export const fetchLoginUserSuccess = (
  token: string
): FetchLoginUserSuccess => ({
  type: dataTypes.FETCH_LOGIN_USER_SUCCESS,
  payload: token,
});

export const fetchLoginUserFailure = (
  error: string
): FetchLoginUserFailure => ({
  type: dataTypes.FETCH_LOGIN_USER_FAILURE,
  payload: error,
});
