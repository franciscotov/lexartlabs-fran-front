import { all, fork } from "redux-saga/effects";
import loginUserSaga from "./dataSaga";

export function* rootSaga() {
  yield all([fork(loginUserSaga)]);
}
