import axios from 'axios';
import {Alert} from 'react-native';
import {getToken, removeToken, storeToken} from '../utils/storage';
import {navigateToLogin} from '../navigation/helpers/navigationHelpers';
import {refreshToken} from './authService';
import appConfig from '../appConfig';

const API_BASE_URL = appConfig.BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const isDevelopment = process.env.NODE_ENV === 'development';

const handleError = async error => {
  if (isDevelopment) {
    console.log('API call failed:', error.config);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
      console.log('Headers:', error.response.headers);
    }
  }

  if (
    error.response &&
    error.response.status === 401 &&
    !error.config.__isRetryRequest
  ) {
    try {
      // Mark the request as a retry request
      error.config.__isRetryRequest = true;

      const {authToken, refreshToken: newRefreshToken} = await refreshToken();
      error.config.headers['Authorization'] = `Bearer ${authToken}`;
      await storeToken(authToken);
      newRefreshToken && (await storeToken(refreshToken, 'refreshToken'));
      return api.request(error.config); // Retry the original request with the new token
    } catch (refreshError) {
      removeToken(true, true);
      navigateToLogin();
      return Promise.reject(refreshError);
    }
  }

  if (!error.response) {
    Alert.alert('Network Error', 'Please check your internet connection.');
  }

  return Promise.reject(error);
};

api.interceptors.request.use(
  async config => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (isDevelopment) {
      // console.log('Request URL:', config.url);
      // console.log('Request Headers:', config.headers);
      // console.log('Request Data:', config.data);
    }
    return config;
  },
  error => {
    if (isDevelopment) {
      console.error('Request error:', error);
    }
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    if (isDevelopment) {
      console.log('Response Data:', response.data);
      console.log('Response Status:', response.status);
    }
    return response;
  },
  error => handleError(error),
);

export default api;
