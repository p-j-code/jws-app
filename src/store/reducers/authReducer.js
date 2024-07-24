// src/store/reducers/authReducer.js

import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE,
  REQUEST_OTP_FOR_PASSWORD_RESET_REQUEST,
  REQUEST_OTP_FOR_PASSWORD_RESET_SUCCESS,
  REQUEST_OTP_FOR_PASSWORD_RESET_FAILURE,
  RESET_PASSWORD_WITH_OTP_REQUEST,
  RESET_PASSWORD_WITH_OTP_SUCCESS,
  RESET_PASSWORD_WITH_OTP_FAILURE,
  REQUEST_ACCOUNT_DELETE_REQUEST,
  REQUEST_ACCOUNT_DELETE_SUCCESS,
  REQUEST_ACCOUNT_DELETE_FAILURE,
  RESEND_OTP_REQUEST,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_FAILURE,
  LOGOUT_USER,
  SET_INITIAL_TOKEN,
  SET_MAIN_ACCESS,
} from '../actions/authActions';

const initialState = {
  loading: false,
  user: null,
  authToken: null,
  refreshToken: null,
  isAuthenticated: false,
  error: null,
  otpVerificationMessage: null,
  otpVerificationError: null, // Add this line
  passwordChangeMessage: null,
  profileUpdateMessage: null,
  otpPasswordResetMessage: null,
  passwordResetMessage: null,
  accountDeleteMessage: null,
  resetOTPMessage: null,
  hasMainAccess: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    case VERIFY_OTP_REQUEST:
    case LOGIN_USER_REQUEST:
    case GET_USER_REQUEST:
    case CHANGE_PASSWORD_REQUEST:
    case UPDATE_PROFILE_REQUEST:
    case REFRESH_TOKEN_REQUEST:
    case REQUEST_OTP_FOR_PASSWORD_RESET_REQUEST:
    case RESET_PASSWORD_WITH_OTP_REQUEST:
    case REQUEST_ACCOUNT_DELETE_REQUEST:
    case RESEND_OTP_REQUEST:
      return {...state, loading: true, error: null};

    case REGISTER_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        authToken: action.payload.authToken,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user,
        isAuthenticated: true,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
      };

    case CHANGE_PASSWORD_SUCCESS:
      return {...state, loading: false, passwordChangeMessage: action.payload};

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profileUpdateMessage: action.payload.message,
        user: action.payload.user,
      };

    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        authToken: action.payload.authToken,
        refreshToken: action.payload.refreshToken,
      };

    case REQUEST_OTP_FOR_PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        loading: false,
        otpPasswordResetMessage: action.payload,
      };

    case RESET_PASSWORD_WITH_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        passwordResetMessage: action.payload,
        error: null,
        otpVerificationError: null,
      };

    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        authToken: action.payload.authToken,
        refreshToken: action.payload.refreshToken,
        otpVerificationMessage: action.payload.message,
        user: action.payload.user,
        otpVerificationError: null, // Clear the error
        isAuthenticated: true,
      };

    case REQUEST_ACCOUNT_DELETE_SUCCESS:
      return {...state, loading: false, accountDeleteMessage: action.payload};

    case RESEND_OTP_SUCCESS:
      return {...state, loading: false, resetOTPMessage: action.payload};

    case LOGOUT_USER:
      return initialState;

    case LOGIN_USER_FAILURE:
    case GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        user: action.payload.user,
      };

    case VERIFY_OTP_FAILURE:
    case RESET_PASSWORD_WITH_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        otpVerificationError: action.payload, // Add this line
      };

    case REGISTER_USER_FAILURE:
    case CHANGE_PASSWORD_FAILURE:
    case UPDATE_PROFILE_FAILURE:
    case REFRESH_TOKEN_FAILURE:
    case REQUEST_OTP_FOR_PASSWORD_RESET_FAILURE:
    case REQUEST_ACCOUNT_DELETE_FAILURE:
    case RESEND_OTP_FAILURE:
      return {...state, loading: false, error: action.payload};

    case SET_INITIAL_TOKEN:
      return {
        ...state,
        authToken: action.payload?.authToken,
        refreshToken: action.payload?.refreshToken,
        isAuthenticated: true,
      };

    case SET_MAIN_ACCESS:
      return {
        ...state,
        hasMainAccess: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
