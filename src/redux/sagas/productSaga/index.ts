import { create as createProduct, products } from "@/pages/services/productService";
import {
  put,
  CallEffect,
  PutEffect,
  takeEvery,
  takeLatest
} from "redux-saga/effects";

import { ProductDto } from "@/lib/definitions";
import { productTypes } from "@/redux/ActionTypes/productTypes";
import {
  fetchProductFailure,
  fetchProductSuccess,
  getProductListFailure,
  getProductListSuccess,
} from "@/redux/actions/productActions";
import { FetchCreateProduct } from "@/redux/types/types";

const create = (data: ProductDto) => createProduct(data);
const getProducts = () => products();

function* fetchCreateProductSaga(
  action: FetchCreateProduct
): Generator<CallEffect | PutEffect, void, any> {
  try {
    yield create(action.payload);
    yield put(fetchProductSuccess(true));
  } catch (e: any) {
    yield put(fetchProductFailure());
  }
}


function* getProductListSaga(
): Generator<CallEffect | PutEffect, void, any> {
  try {
    const productsRes = yield getProducts();
    console.log({productsRes})
    yield put(getProductListSuccess(productsRes.data.content as ProductDto[]));
  } catch (e: any) {
    yield put(getProductListFailure());
  }
}

function* productSaga() {
  yield takeEvery(productTypes.FETCH_CREATE_PRODUCT, fetchCreateProductSaga);
  yield takeLatest(productTypes.FETCH_GET_PRODUCT_LIST, getProductListSaga);
}

export default productSaga;
