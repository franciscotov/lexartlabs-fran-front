import { ProductDto } from "@/lib/definitions";
import { productTypes } from "../ActionTypes/productTypes";
import {
  FetchProductFailure,
  FetchProductRequest,
  FetchProductSuccess,
  FetchCreateProduct,
  FetchGetProductList,
  GetProductListSuccess,
  GetProductListFailure
} from "../types/types";

export const fetchProductRequest = (): FetchProductRequest => ({
  type: productTypes.FETCH_PRODUCT_REQUEST,
});

export const fetchProductSuccess = (data: boolean): FetchProductSuccess => ({
  type: productTypes.FETCH_CREATE_PRODUCT_SUCCESS,
  payload: data,
});

export const fetchProductFailure = (data: boolean): FetchProductFailure => ({
  type: productTypes.FETCH_CREATE_PRODUCT_FAILURE,
  payload: data,
});

export const fetchCreateProduct = (data: ProductDto): FetchCreateProduct => ({
  type: productTypes.FETCH_CREATE_PRODUCT,
  payload: data,
});

export const fetchGetProductList = (): FetchGetProductList => ({
  type: productTypes.FETCH_GET_PRODUCT_LIST,
});

export const getProductListSuccess = (
  data: ProductDto[]
): GetProductListSuccess => ({
  type: productTypes.GET_PRODUCT_LIST_SUCCESS,
  payload: data,
});

export const getProductListFailure = (): GetProductListFailure => ({
  type: productTypes.GET_PRODUCT_LIST_FAILURE,
  payload: false,
});
