import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { loginRequest, loginSuccess, loginFailure } from '../Store/Auth/AuthSlice';

function* handleLogin(action) {
  try {
    const response = yield call(axios.post, 'http://localhost:8080/api/auth/user/login', {
      userName: action.payload.username,
      password: action.payload.password,
    });

    const responseBody = response.data.data.body;

    if (responseBody && responseBody.jwt) {
      localStorage.setItem("token", responseBody.jwt);
      localStorage.setItem("username", responseBody.userName);

      if (responseBody.role === "USER") {
        action.payload.navigate("/usertable");
      } else if (responseBody.role === "ADMIN") {
        action.payload.navigate("/admintable");
      } else {
        yield put(loginFailure({ error: "Unexpected user role" }));
      }
      yield put(loginSuccess({ user: responseBody }));
    } else {
      yield put(loginFailure({ error: "User is not found" }));
    }
  } catch (error) {
    yield put(loginFailure({ error: "Error logging in" }));
  }
}

export default function* authSagas() {
  yield takeLatest(loginRequest.type, handleLogin);
}
