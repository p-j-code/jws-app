// services/api.js
import axios from 'axios';
import axiosRetry from 'axios-retry';
import {Alert} from 'react-native';
import {getToken, removeToken, storeToken} from '../utils/storage';
import {navigateToLogin} from '../navigation/helpers/navigationHelpers';
import {refreshToken} from './authService';
import appConfig from '../appConfig';

const API_BASE_URL = appConfig.BASE_URL;

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 50000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.isRefreshing = false;
    this.failedQueue = [];

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();

    // Configure axios-retry
    axiosRetry(this.api, {
      retries: 3,
      retryDelay: retryCount => axiosRetry.exponentialDelay(retryCount),
      retryCondition: error =>
        axiosRetry.isNetworkError(error) || axiosRetry.isRetryableError(error),
    });
  }

  initializeRequestInterceptor() {
    this.api.interceptors.request.use(
      async config => {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add timestamp for timing
        config.metadata = {startTime: new Date()};

        // Create a cancel token source for each request
        const source = axios.CancelToken.source();
        config.cancelToken = source.token;
        config.metadata.cancelSource = source;

        if (this.isDevelopment) {
          console.log('Request URL:', config.url);
          // console.log('Request Headers:', config.headers);
          // console.log('Request Data:', config.data);
        }

        return config;
      },
      error => {
        if (this.isDevelopment) {
          console.error('Request error:', error);
        }
        return Promise.reject(error);
      },
    );
  }

  initializeResponseInterceptor() {
    this.api.interceptors.response.use(
      response => {
        // Calculate and log the time taken for the request
        if (
          response.config &&
          response.config.metadata &&
          response.config.metadata.startTime
        ) {
          const endTime = new Date();
          const duration = endTime - response.config.metadata.startTime;
          console.log(
            `API Call: ${response.config.method.toUpperCase()} ${response.config.url} took ${duration} ms`,
          );
        }

        if (this.isDevelopment) {
          console.log('Response Data:', response.data);
          console.log('Response Status:', response.status);
        }

        return response;
      },
      async error => {
        // Calculate and log the time taken before the error was thrown
        if (
          error.config &&
          error.config.metadata &&
          error.config.metadata.startTime
        ) {
          const endTime = new Date();
          const duration = endTime - error.config.metadata.startTime;
          console.log(
            `API Call Failed: ${error.config.method.toUpperCase()} ${error.config.url} took ${duration} ms`,
          );
        }

        const {config, response} = error;
        const originalRequest = config;

        if (response && response.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({resolve, reject});
            })
              .then(token => {
                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                return this.api(originalRequest);
              })
              .catch(err => {
                return Promise.reject(err);
              });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              const {authToken, refreshToken: newRefreshToken} =
                await refreshToken();
              await storeToken(authToken);
              if (newRefreshToken) {
                await storeToken(newRefreshToken, 'refreshToken');
              }
              this.api.defaults.headers.common['Authorization'] =
                'Bearer ' + authToken;
              originalRequest.headers['Authorization'] = 'Bearer ' + authToken;
              this.processQueue(null, authToken);
              resolve(this.api(originalRequest));
            } catch (err) {
              this.processQueue(err, null);
              removeToken(true, true);
              navigateToLogin();
              reject(err);
            } finally {
              this.isRefreshing = false;
            }
          });
        }

        if (this.isDevelopment) {
          console.error('API response error:', error);
        }

        if (!response) {
          Alert.alert(
            'Network Error',
            'Please check your internet connection.',
          );
        }

        return Promise.reject(error);
      },
    );
  }

  processQueue(error, token = null) {
    this.failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    this.failedQueue = [];
  }

  // Method to cancel requests if needed
  cancelRequest(config) {
    if (config.metadata && config.metadata.cancelSource) {
      config.metadata.cancelSource.cancel('Request canceled by the user.');
    }
  }

  // Expose Axios methods
  get(url, config = {}) {
    return this.api.get(url, config);
  }

  post(url, data, config = {}) {
    return this.api.post(url, data, config);
  }

  put(url, data, config = {}) {
    return this.api.put(url, data, config);
  }

  delete(url, config = {}) {
    return this.api.delete(url, config);
  }

  // ... Add other methods as needed
}

// Export a single instance
const apiService = new ApiService();
export default apiService.api;
export {apiService};
