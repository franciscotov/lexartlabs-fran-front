import { productTypes } from "../ActionTypes/productTypes";
import {
  FetchProductFailure,
  FetchProductRequest,
  FetchProductFeilurePayload,
  FetchProductSuccessPayload,
  FetchProductSuccess,
} from "../types/types";

export const fetchProductRequest = (): FetchProductRequest => ({
  type: productTypes.FETCH_PRODUCT_REQUEST,
});

export const fetchProductSuccess = (
  data: FetchProductSuccessPayload
): FetchProductSuccess => ({
  type: productTypes.FETCH_PRODUCT_SUCCESS,
  payload: data,
});

export const fetchProductFailure = (
  data: FetchProductFeilurePayload
): FetchProductFailure => ({
  type: productTypes.FETCH_PRODUCT_FAILURE,
  payload: data,
});
