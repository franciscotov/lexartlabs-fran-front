import { create as createProduct } from "../../../pages/services/productService";
import {
  put,
  CallEffect,
  PutEffect,
  takeEvery,
} from "redux-saga/effects";

import { ProductDto } from "@/lib/definitions";
import { productTypes } from "../../ActionTypes/productTypes";
import {
  fetchProductFailure,
  fetchProductSuccess,
} from "../../actions/productActions";
import { FetchCreateProduct } from "../../../redux/types/types";

const create = (data: ProductDto) => createProduct(data);

function* fetchCreateProductSaga(
  action: FetchCreateProduct
): Generator<CallEffect | PutEffect, void, any> {
  try {
    console.log({ action }, "action");
    yield create(action.payload);
    yield put(fetchProductSuccess(true));
  } catch (e: any) {
    yield put(fetchProductFailure(true));
  }
}

function* createProductSaga() {
  yield takeEvery(productTypes.FETCH_CREATE_PRODUCT, fetchCreateProductSaga);
}

export default createProductSaga;