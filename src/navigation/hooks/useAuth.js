import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserRequest, setAuthToken} from '../../store/actions/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuth = () => {
  const dispatch = useDispatch();
  const {authToken, user, loading} = useSelector(state => state.auth);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const checkAuth = async (hardCheck = false) => {
    const storedAuthToken = await AsyncStorage.getItem('accessToken');
    const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
    if (storedAuthToken && storedRefreshToken && (!user || hardCheck)) {
      dispatch(setAuthToken(storedAuthToken, storedRefreshToken));
      dispatch(getUserRequest());
    } else {
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    if (authToken) {
      dispatch(getUserRequest());
    }
  }, [authToken, dispatch]);

  useEffect(() => {
    if (!loading && isCheckingAuth) {
      setIsCheckingAuth(false);
    }
  }, [loading, isCheckingAuth]);

  return {
    loading: loading || isCheckingAuth,
    user,
    checkAuth,
  };
};

export default useAuth;
