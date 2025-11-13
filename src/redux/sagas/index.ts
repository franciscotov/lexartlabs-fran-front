import { all, fork } from "redux-saga/effects";
import loginUserSaga from "./dataSaga";
import productSaga  from "./productSaga";
// import productListSaga  from "./productSaga/productList";

export function* rootSaga() {
  yield all([fork(loginUserSaga)]);
  yield all([fork(productSaga)]);
}
