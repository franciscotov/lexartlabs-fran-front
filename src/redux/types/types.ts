import { productTypes } from "../ActionTypes/productTypes";
import { dataTypes } from "../ActionTypes/dataTypes";

export interface FetchProductFeilurePayload {
  type: productTypes.FETCH_PRODUCT_FAILURE;
}

export interface FetchProductRequest {
  type: productTypes.FETCH_PRODUCT_REQUEST;
}

export interface FetchProductSuccessPayload {
  type: productTypes.FETCH_PRODUCT_SUCCESS;
}

export interface FetchProductSuccess {
  type: productTypes.FETCH_PRODUCT_SUCCESS;
  payload: FetchProductSuccessPayload;
}

export interface FetchProductFailure {
  type: productTypes.FETCH_PRODUCT_FAILURE;
  payload: FetchProductFeilurePayload;
}

export interface FetchLoginUserSuccess {
  type: dataTypes.FETCH_LOGIN_USER_SUCCESS;
  payload: string;
}

export interface FetchLoginUserFailure {
  type: dataTypes.FETCH_LOGIN_USER_FAILURE;
  payload: string;
}

export interface FetchLoginUserRequest {
  type: dataTypes.FETCH_LOGIN_USER_REQUEST;
}

export type ProductActions =
  | FetchProductRequest
  | FetchProductSuccess
  | FetchProductFailure;

export type DataActions =
  | FetchLoginUserSuccess
  | FetchLoginUserRequest
  | FetchLoginUserFailure;

export interface ProductState {
  pending: boolean;
  products: any[];
  error: any;
}

export interface UserData {
  pending: boolean;
  token: string;
  error: any;
}

export interface DataState {
  pending: boolean;
  data: UserData;
  error: any;
}
