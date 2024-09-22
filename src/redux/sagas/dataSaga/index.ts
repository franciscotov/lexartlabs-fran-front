import { loginUser } from "../../../pages/services/userService";
import { put, takeLatest, CallEffect, PutEffect } from "redux-saga/effects";
import { fetchLoginUserSuccess, fetchLoginUserFailure } from "../../actions/dataActions";

import { dataTypes } from "../../ActionTypes/dataTypes";

const login = () => loginUser();


function* fetchLoginUserSaga(): Generator<CallEffect | PutEffect, void, any> {
  try {
    const response = yield login();
    yield put(fetchLoginUserSuccess(response.data));
  } catch (e: any) {
    yield put(fetchLoginUserFailure(e.message));
  }
}

function* loginUserSaga() {
  yield takeLatest(dataTypes.FETCH_LOGIN_USER_REQUEST, fetchLoginUserSaga);
}

export default loginUserSaga;
