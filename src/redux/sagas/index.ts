import { all, fork } from "redux-saga/effects";
import loginUserSaga from "./dataSaga";
import createProductSaga from "./productSaga";

export function* rootSaga() {
  yield all([fork(loginUserSaga)]);
  yield all([fork(createProductSaga)]);
}
