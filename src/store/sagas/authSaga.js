// src/store/sagas/authSaga.js

import {call, put, takeEvery} from 'redux-saga/effects';
import * as authService from '../../services/authService';
import {
  navigate,
  navigateToLogin,
} from '../../navigation/helpers/navigationHelpers';
import {removeToken} from '../../utils/storage';
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
import {setMessage} from '../actions/messageActions';
import {ADMIN_MESSAGE_SCREEN} from '../../navigation/routeConfigurations/authRoutes';

function* registerUserSaga(action) {
  try {
    const data = yield call(authService.registerUser, action.payload);
    if (data.error) {
      yield put(registerUserFailure(data.error));
    } else {
      console.log('registerUserSaga', {data});
      yield put(registerUserSuccess(data));
      yield put(setMessage(data.message, 'success'));
    }
  } catch (error) {
    yield put(registerUserFailure(error.message));
    yield put(setMessage(error.message, 'error'));
  }
}

function* resendOtpSaga(action) {
  try {
    const phoneNumber = action.payload;
    const data = yield call(authService.resendOtp, phoneNumber);
    if (data.error) {
      yield put(resendOtpFailure(data.error));
    } else {
      yield put(resendOtpSuccess(data.message));
      yield put(setMessage('OTP resent successfully', 'success'));
    }
  } catch (error) {
    yield put(resendOtpFailure(error.message));
    yield put(setMessage(error.message, 'error'));
  }
}

function* verifyOtpSaga(action) {
  try {
    const {otpData, successCallback} = action.payload;
    const data = yield call(authService.verifyOtp, otpData);
    if (data.error) {
      yield put(verifyOtpFailure(data.error));
    } else {
      yield put(verifyOtpSuccess(data));
      successCallback && successCallback();
      yield put(setMessage('OTP verified successfully', 'success'));
    }
  } catch (error) {
    yield put(verifyOtpFailure(error.message));
    yield put(setMessage(error.message, 'error'));
  }
}

function* loginUserSaga(action) {
  try {
    const data = yield call(authService.loginUser, action.payload);
    if (data.error) {
      yield put(loginUserFailure(data.error, data.user));
    } else {
      yield put(loginUserSuccess(data));
      yield put(setMessage('Login successful', 'success'));
    }
  } catch (error) {
    yield put(loginUserFailure(error.message));
    yield put(setMessage(error.message, 'error'));
  }
}

function* getUserSaga() {
  try {
    const data = yield call(authService.getUser);

    if (data.error) {
      yield put(getUserFailure(data.error, data.user));
    } else {
      yield put(getUserSuccess(data.user));
    }
  } catch (error) {
    yield put(getUserFailure(error.message));
    yield put(setMessage(error.message, 'error'));
  }
}

function* changePasswordSaga(action) {
  try {
    const data = yield call(
      authService.changePassword,
      action.payload.passwords,
    );
    if (data.error) {
      yield put(changePasswordFailure(data.error));
    } else {
      yield put(changePasswordSuccess(data.message));
      action.payload?.successCallback && action.payload.successCallback();
      yield put(setMessage('Password Updated successfully', 'success'));
    }
  } catch (error) {
    yield put(changePasswordFailure(error.message));
    yield put(setMessage(error.message, 'error'));
  }
}

function* updateProfileSaga(action) {
  try {
    const data = yield call(
      authService.updateProfile,
      action.payload.updateFields,
    );

    if (data.error) {
      yield put(updateProfileFailure(data.error));
    } else {
      console.log({user: data.user});
      yield put(updateProfileSuccess(data.message, data.user));
      action.payload.successCallback && action.payload.successCallback();
      yield put(setMessage('Profile updated successfully', 'success'));
    }
  } catch (error) {
    yield put(updateProfileFailure(error.message));
    yield put(setMessage(error.message, 'error'));
  }
}

function* refreshTokenSaga() {
  try {
    const data = yield call(authService.refreshToken);
    if (data.error) {
      yield put(refreshTokenFailure(data.error));
    } else {
      yield put(refreshTokenSuccess(data));
      yield put(setMessage('Token refreshed successfully', 'success'));
    }
  } catch (error) {
    yield put(refreshTokenFailure(error.message));
    yield put(setMessage(error.message, 'error'));
  }
}

function* requestOtpForPasswordResetSaga(action) {
  const {phoneNumber, successCallback} = action.payload;
  try {
    const data = yield call(
      authService.requestOtpForPasswordReset,
      phoneNumber,
    );
    if (data.error) {
      yield put(requestOtpForPasswordResetFailure(data.error));
    } else {
      yield put(requestOtpForPasswordResetSuccess(data.message));
      successCallback && successCallback();
      yield put(setMessage('OTP sent successfully', 'success'));
    }
  } catch (error) {
    yield put(requestOtpForPasswordResetFailure(error.message));
    yield put(setMessage(error.message, 'error'));
  }
}

function* resetPasswordWithOtpSaga(action) {
  const {resetData, successCallback} = action.payload;
  try {
    const data = yield call(authService.resetPasswordWithOtp, resetData);
    if (data.error) {
      yield put(resetPasswordWithOtpFailure(data.error));
    } else {
      yield put(resetPasswordWithOtpSuccess(data.message));
      yield put(setMessage('Password reset successfully', 'success'));
      successCallback && successCallback();
    }
  } catch (error) {
    yield put(resetPasswordWithOtpFailure(error.message));
    yield put(setMessage(error.message, 'error'));
  }
}

function* requestAccountDeleteSaga() {
  try {
    const data = yield call(authService.requestAccountDelete);
    if (data.error) {
      yield put(requestAccountDeleteFailure(data.error));
    } else {
      yield put(requestAccountDeleteSuccess(data.message));
      navigate(ADMIN_MESSAGE_SCREEN);
      yield put(
        setMessage('Account deletion requested successfully', 'success'),
      );
    }
  } catch (error) {
    yield put(requestAccountDeleteFailure(error.message));
    yield put(setMessage(error.message, 'error'));
  }
}

function* logoutSaga() {
  try {
    navigateToLogin();
    yield call(removeToken, true, true);
    yield put(setMessage('Logout successful', 'success'));
  } catch (error) {
    console.log('Logout failed:', error);
    yield put(setMessage('Logout failed', 'error'));
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
