// src/services/authService.js

import api from './api';
import {storeToken} from '../utils/storage';

export const registerUser = async userData => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};

export const verifyOtp = async otpData => {
  try {
    const response = await api.post('/verify-otp', otpData);
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
    const response = await api.post('/login', credentials);
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
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};

export const changePassword = async passwords => {
  try {
    const response = await api.post('/change-password', passwords);
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};

export const updateProfile = async updateFields => {
  try {
    const response = await api.put('/profile', updateFields);
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};

export const refreshToken = async () => {
  try {
    const response = await api.post('/token/refresh');
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
    const response = await api.post('/forgot-password/request-otp', {
      phoneNumber,
    });
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};

export const resetPasswordWithOtp = async resetData => {
  try {
    const response = await api.post('/forgot-password/reset', resetData);
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};

export const requestAccountDelete = async () => {
  try {
    const response = await api.post('/request-account-delete');
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};
