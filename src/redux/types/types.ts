import { productTypes } from "../ActionTypes/productTypes";
import { dataTypes } from "../ActionTypes/dataTypes";
import { ProductDto } from "@/lib/definitions";
import { Status } from "@/constants";

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

export interface FetchGetProductList {
  type: productTypes.FETCH_GET_PRODUCT_LIST;
}

export interface GetProductListSuccess {
  type: productTypes.GET_PRODUCT_LIST_SUCCESS;
  payload: ProductDto[];
}

export interface GetProductListFailure {
  type: productTypes.GET_PRODUCT_LIST_FAILURE;
}

export type ProductActions =
  | FetchProductRequest
  | FetchProductSuccess
  | FetchProductFailure
  | FetchCreateProduct
  | FetchGetProductList
  | GetProductListSuccess
  | GetProductListFailure;

export type DataActions =
  | FetchLoginUserSuccess
  | FetchLoginUserRequest
  | FetchLoginUserFailure;

export interface ProductState {
  pending: boolean;
  products: ProductDto[];
  error: any;
  lastProductWasCreated: boolean;
  status: Status;
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
