import AsyncStorage from '@react-native-async-storage/async-storage';

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
