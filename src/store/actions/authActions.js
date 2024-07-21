// src/store/actions/authActions.js

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const VERIFY_OTP_REQUEST = 'VERIFY_OTP_REQUEST';
export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';
export const VERIFY_OTP_FAILURE = 'VERIFY_OTP_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';

export const REQUEST_OTP_FOR_PASSWORD_RESET_REQUEST =
  'REQUEST_OTP_FOR_PASSWORD_RESET_REQUEST';
export const REQUEST_OTP_FOR_PASSWORD_RESET_SUCCESS =
  'REQUEST_OTP_FOR_PASSWORD_RESET_SUCCESS';
export const REQUEST_OTP_FOR_PASSWORD_RESET_FAILURE =
  'REQUEST_OTP_FOR_PASSWORD_RESET_FAILURE';

export const RESET_PASSWORD_WITH_OTP_REQUEST =
  'RESET_PASSWORD_WITH_OTP_REQUEST';
export const RESET_PASSWORD_WITH_OTP_SUCCESS =
  'RESET_PASSWORD_WITH_OTP_SUCCESS';
export const RESET_PASSWORD_WITH_OTP_FAILURE =
  'RESET_PASSWORD_WITH_OTP_FAILURE';

export const REQUEST_ACCOUNT_DELETE_REQUEST = 'REQUEST_ACCOUNT_DELETE_REQUEST';
export const REQUEST_ACCOUNT_DELETE_SUCCESS = 'REQUEST_ACCOUNT_DELETE_SUCCESS';
export const REQUEST_ACCOUNT_DELETE_FAILURE = 'REQUEST_ACCOUNT_DELETE_FAILURE';

export const RESEND_OTP_REQUEST = 'RESEND_OTP_REQUEST';
export const RESEND_OTP_SUCCESS = 'RESEND_OTP_SUCCESS';
export const RESEND_OTP_FAILURE = 'RESEND_OTP_FAILURE';

export const SET_INITIAL_TOKEN = 'SET_INITIAL_TOKEN';

export const LOGOUT_USER = 'LOGOUT_USER';

export const setInitialToken = (authToken, refreshToken) => ({
  type: SET_INITIAL_TOKEN,
  payload: {authToken, refreshToken},
});

// Action creators
export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const resendOtpRequest = phoneNumber => ({
  type: RESEND_OTP_REQUEST,
  payload: phoneNumber,
});

export const resendOtpSuccess = message => ({
  type: RESEND_OTP_SUCCESS,
  payload: message,
});

export const resendOtpFailure = error => ({
  type: RESEND_OTP_FAILURE,
  payload: error,
});

export const registerUserRequest = userData => ({
  type: REGISTER_USER_REQUEST,
  payload: userData,
});

export const registerUserSuccess = user => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
});

export const registerUserFailure = error => ({
  type: REGISTER_USER_FAILURE,
  payload: error,
});

export const verifyOtpRequest = otpData => ({
  type: VERIFY_OTP_REQUEST,
  payload: otpData,
});

export const verifyOtpSuccess = tokens => ({
  type: VERIFY_OTP_SUCCESS,
  payload: tokens,
});

export const verifyOtpFailure = error => ({
  type: VERIFY_OTP_FAILURE,
  payload: error,
});

export const loginUserRequest = credentials => ({
  type: LOGIN_USER_REQUEST,
  payload: credentials,
});

export const loginUserSuccess = tokens => ({
  type: LOGIN_USER_SUCCESS,
  payload: tokens,
});

export const loginUserFailure = (error, user) => ({
  type: LOGIN_USER_FAILURE,
  payload: {error, user},
});

export const getUserRequest = () => ({
  type: GET_USER_REQUEST,
});

export const getUserSuccess = user => ({
  type: GET_USER_SUCCESS,
  payload: user,
});

export const getUserFailure = (error, user) => ({
  type: GET_USER_FAILURE,
  payload: {error, user},
});

export const changePasswordRequest = passwords => ({
  type: CHANGE_PASSWORD_REQUEST,
  payload: passwords,
});

export const changePasswordSuccess = message => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: message,
});

export const changePasswordFailure = error => ({
  type: CHANGE_PASSWORD_FAILURE,
  payload: error,
});

export const updateProfileRequest = updateFields => ({
  type: UPDATE_PROFILE_REQUEST,
  payload: updateFields,
});

export const updateProfileSuccess = (message, user) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: {message, user},
});

export const updateProfileFailure = error => ({
  type: UPDATE_PROFILE_FAILURE,
  payload: error,
});

export const refreshTokenRequest = () => ({
  type: REFRESH_TOKEN_REQUEST,
});

export const refreshTokenSuccess = tokens => ({
  type: REFRESH_TOKEN_SUCCESS,
  payload: tokens,
});

export const refreshTokenFailure = error => ({
  type: REFRESH_TOKEN_FAILURE,
  payload: error,
});

export const requestOtpForPasswordResetRequest = phoneNumber => ({
  type: REQUEST_OTP_FOR_PASSWORD_RESET_REQUEST,
  payload: phoneNumber,
});

export const requestOtpForPasswordResetSuccess = message => ({
  type: REQUEST_OTP_FOR_PASSWORD_RESET_SUCCESS,
  payload: message,
});

export const requestOtpForPasswordResetFailure = error => ({
  type: REQUEST_OTP_FOR_PASSWORD_RESET_FAILURE,
  payload: error,
});

export const resetPasswordWithOtpRequest = resetData => ({
  type: RESET_PASSWORD_WITH_OTP_REQUEST,
  payload: resetData,
});

export const resetPasswordWithOtpSuccess = message => ({
  type: RESET_PASSWORD_WITH_OTP_SUCCESS,
  payload: message,
});

export const resetPasswordWithOtpFailure = error => ({
  type: RESET_PASSWORD_WITH_OTP_FAILURE,
  payload: error,
});

export const requestAccountDeleteRequest = () => ({
  type: REQUEST_ACCOUNT_DELETE_REQUEST,
});

export const requestAccountDeleteSuccess = message => ({
  type: REQUEST_ACCOUNT_DELETE_SUCCESS,
  payload: message,
});

export const requestAccountDeleteFailure = error => ({
  type: REQUEST_ACCOUNT_DELETE_FAILURE,
  payload: error,
});
