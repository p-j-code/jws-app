// src/store/sagas/auth/index.js

import {call, put, takeEvery} from 'redux-saga/effects';
import * as authService from '../../services/authService';
import {navigateToLogin} from '../../navigation/helpers/navigationHelpers';
import {removeToken} from '../../utils/storage.js';
import {
  REGISTER_USER_REQUEST,
  VERIFY_OTP_REQUEST,
  LOGIN_USER_REQUEST,
  GET_USER_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  UPDATE_PROFILE_REQUEST,
  REFRESH_TOKEN_REQUEST,
  REQUEST_OTP_FOR_PASSWORD_RESET_REQUEST,
  RESET_PASSWORD_WITH_OTP_REQUEST,
  REQUEST_ACCOUNT_DELETE_REQUEST,
  LOGOUT_USER,
  registerUserSuccess,
  registerUserFailure,
  verifyOtpSuccess,
  verifyOtpFailure,
  loginUserSuccess,
  loginUserFailure,
  getUserSuccess,
  getUserFailure,
  changePasswordSuccess,
  changePasswordFailure,
  updateProfileSuccess,
  updateProfileFailure,
  refreshTokenSuccess,
  refreshTokenFailure,
  requestOtpForPasswordResetSuccess,
  requestOtpForPasswordResetFailure,
  resetPasswordWithOtpSuccess,
  resetPasswordWithOtpFailure,
  requestAccountDeleteSuccess,
  requestAccountDeleteFailure,
  RESEND_OTP_REQUEST,
  resendOtpSuccess,
  resendOtpFailure,
} from '../actions/authActions';

function* registerUserSaga(action) {
  try {
    const data = yield call(authService.registerUser, action.payload);
    if (data.error) {
      yield put(registerUserFailure(data.error));
    } else {
      yield put(registerUserSuccess(data));
    }
  } catch (error) {
    yield put(registerUserFailure(error.message));
  }
}

function* resendOtpSaga(action) {
  try {
    const phoneNumber = action.payload;
    const data = yield call(userService.resendOtp, phoneNumber);
    if (data.error) {
      yield put(resendOtpFailure(data.error));
    } else {
      yield put(resendOtpSuccess(data.message));
    }
  } catch (error) {
    yield put(resendOtpFailure(error.message));
  }
}

function* verifyOtpSaga(action) {
  try {
    const data = yield call(authService.verifyOtp, action.payload);
    if (data.error) {
      yield put(verifyOtpFailure(data.error));
    } else {
      yield put(verifyOtpSuccess(data.message));
    }
  } catch (error) {
    yield put(verifyOtpFailure(error.message));
  }
}

function* loginUserSaga(action) {
  try {
    const data = yield call(authService.loginUser, action.payload);
    if (data.error) {
      yield put(loginUserFailure(data.error));
    } else {
      yield put(loginUserSuccess(data));
    }
  } catch (error) {
    yield put(loginUserFailure(error.message));
  }
}

function* getUserSaga() {
  try {
    const data = yield call(authService.getUser);
    if (data.error) {
      yield put(getUserFailure(data.error));
    } else {
      yield put(getUserSuccess(data));
    }
  } catch (error) {
    yield put(getUserFailure(error.message));
  }
}

function* changePasswordSaga(action) {
  try {
    const data = yield call(authService.changePassword, action.payload);
    if (data.error) {
      yield put(changePasswordFailure(data.error));
    } else {
      yield put(changePasswordSuccess(data.message));
    }
  } catch (error) {
    yield put(changePasswordFailure(error.message));
  }
}

function* updateProfileSaga(action) {
  try {
    const data = yield call(authService.updateProfile, action.payload);
    if (data.error) {
      yield put(updateProfileFailure(data.error));
    } else {
      yield put(updateProfileSuccess(data.message));
    }
  } catch (error) {
    yield put(updateProfileFailure(error.message));
  }
}

function* refreshTokenSaga() {
  try {
    const data = yield call(authService.refreshToken);
    if (data.error) {
      yield put(refreshTokenFailure(data.error));
    } else {
      yield put(refreshTokenSuccess(data));
    }
  } catch (error) {
    yield put(refreshTokenFailure(error.message));
  }
}

function* requestOtpForPasswordResetSaga(action) {
  try {
    const data = yield call(
      authService.requestOtpForPasswordReset,
      action.payload,
    );
    if (data.error) {
      yield put(requestOtpForPasswordResetFailure(data.error));
    } else {
      yield put(requestOtpForPasswordResetSuccess(data.message));
    }
  } catch (error) {
    yield put(requestOtpForPasswordResetFailure(error.message));
  }
}

function* resetPasswordWithOtpSaga(action) {
  try {
    const data = yield call(authService.resetPasswordWithOtp, action.payload);
    if (data.error) {
      yield put(resetPasswordWithOtpFailure(data.error));
    } else {
      yield put(resetPasswordWithOtpSuccess(data.message));
    }
  } catch (error) {
    yield put(resetPasswordWithOtpFailure(error.message));
  }
}

function* requestAccountDeleteSaga() {
  try {
    const data = yield call(authService.requestAccountDelete);
    if (data.error) {
      yield put(requestAccountDeleteFailure(data.error));
    } else {
      yield put(requestAccountDeleteSuccess(data.message));
    }
  } catch (error) {
    yield put(requestAccountDeleteFailure(error.message));
  }
}

function* logoutSaga() {
  try {
    // yield call(authService.logoutUser);
    // yield put(clearOtpToken());
    yield call(removeToken, true, true);
    navigateToLogin;
  } catch (error) {
    console.log('Logout failed:', error);
    // Optionally handle any errors, such as network issues
  }
}

export default function* watchAuthSagas() {
  yield takeEvery(REGISTER_USER_REQUEST, registerUserSaga);
  yield takeEvery(VERIFY_OTP_REQUEST, verifyOtpSaga);
  yield takeEvery(LOGIN_USER_REQUEST, loginUserSaga);
  yield takeEvery(GET_USER_REQUEST, getUserSaga);
  yield takeEvery(CHANGE_PASSWORD_REQUEST, changePasswordSaga);
  yield takeEvery(UPDATE_PROFILE_REQUEST, updateProfileSaga);
  yield takeEvery(REFRESH_TOKEN_REQUEST, refreshTokenSaga);
  yield takeEvery(
    REQUEST_OTP_FOR_PASSWORD_RESET_REQUEST,
    requestOtpForPasswordResetSaga,
  );
  yield takeEvery(RESET_PASSWORD_WITH_OTP_REQUEST, resetPasswordWithOtpSaga);
  yield takeEvery(REQUEST_ACCOUNT_DELETE_REQUEST, requestAccountDeleteSaga);
  yield takeEvery(LOGOUT_USER, logoutSaga);
  yield takeEvery(RESEND_OTP_REQUEST, resendOtpSaga);
}
