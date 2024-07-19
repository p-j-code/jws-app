// src/services/authService.js

import api from './api';
import {storeToken} from '../utils/storage';

export const registerUser = async userData => {
  try {
    const response = await api.post('/user/register', userData);
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};

export const verifyOtp = async otpData => {
  try {
    const response = await api.post('/user/verify-otp', otpData);
    const {authToken, refreshToken} = response.data;
    await storeToken(authToken);
    await storeToken(refreshToken, 'refreshToken');
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};

export const loginUser = async credentials => {
  try {
    const response = await api.post('/user/login', credentials);
    const {authToken, refreshToken} = response.data;
    await storeToken(authToken);
    await storeToken(refreshToken, 'refreshToken');
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};

export const getUser = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};

export const changePassword = async passwords => {
  try {
    const response = await api.post('/user/change-password', passwords);
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};

export const updateProfile = async updateFields => {
  try {
    const response = await api.put('/user/profile', updateFields);
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};

export const refreshToken = async () => {
  try {
    const response = await api.post('/user/token/refresh');
    const {authToken, refreshToken} = response.data;
    await storeToken(authToken);
    await storeToken(refreshToken, 'refreshToken');
    return {authToken, refreshToken};
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};

export const requestOtpForPasswordReset = async phoneNumber => {
  try {
    const response = await api.post('/user/forgot-password/request-otp', {
      phoneNumber,
    });
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};

export const resetPasswordWithOtp = async resetData => {
  try {
    const response = await api.post('/user/forgot-password/reset', resetData);
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};

export const requestAccountDelete = async () => {
  try {
    const response = await api.post('/user/request-account-delete');
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};
