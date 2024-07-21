import AsyncStorage from '@react-native-async-storage/async-storage';
import {setInitialToken} from '../store/actions/authActions';

export const storeToken = async (token, key = 'accessToken') => {
  await AsyncStorage.setItem(key, token);
};

export const getToken = async (key = 'accessToken') => {
  return await AsyncStorage.getItem(key);
};

export const removeToken = async (
  removeAccessToken = true,
  removeRefreshToken = false,
) => {
  removeAccessToken && (await AsyncStorage.removeItem('accessToken'));
  removeRefreshToken && (await AsyncStorage.removeItem('refreshToken'));
};

export const initializeAuth = () => async dispatch => {
  const authToken = await getToken('accessToken');
  const refreshToken = await getToken('refreshToken');
  if (authToken && refreshToken) {
    dispatch(setInitialToken(authToken, refreshToken));
  }
};

// removeToken();
