import { productTypes } from "../ActionTypes/productTypes";
import { dataTypes } from "../ActionTypes/dataTypes";
import { ProductDto } from "@/lib/definitions";

export interface FetchProductFeilurePayload {
  type: productTypes.FETCH_CREATE_PRODUCT_FAILURE;
}

export interface FetchProductRequest {
  type: productTypes.FETCH_PRODUCT_REQUEST;
}

export interface FetchProductSuccessPayload {
  type: productTypes.FETCH_CREATE_PRODUCT_SUCCESS;
}

export interface FetchProductSuccess {
  type: productTypes.FETCH_CREATE_PRODUCT_SUCCESS;
  payload: boolean;
}

export interface FetchCreateProduct {
  type: productTypes.FETCH_CREATE_PRODUCT;
  payload: ProductDto;
}

export interface FetchProductFailure {
  type: productTypes.FETCH_CREATE_PRODUCT_FAILURE;
  payload: boolean;
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
  | FetchProductFailure
  | FetchCreateProduct;

export type DataActions =
  | FetchLoginUserSuccess
  | FetchLoginUserRequest
  | FetchLoginUserFailure;

export interface ProductState {
  pending: boolean;
  products: any[];
  error: any;
  lastProductWasCreated: boolean;
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

// props for rootReducer
export interface StateI {
  products: ProductState;
  data: DataState;
}
