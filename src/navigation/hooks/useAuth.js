import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserRequest, setAuthToken} from '../../store/actions/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuth = () => {
  const dispatch = useDispatch();
  const {isAuthenticated, authToken, user, loading} = useSelector(
    state => state.auth,
  );
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  console.log({isAuthenticated, authToken, user, loading});
  useEffect(() => {
    const checkAuth = async () => {
      const storedAuthToken = await AsyncStorage.getItem('accessToken');
      const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
      if (storedAuthToken && storedRefreshToken) {
        dispatch(setAuthToken(storedAuthToken, storedRefreshToken));
        dispatch(getUserRequest());
      } else {
        setIsCheckingAuth(false);
      }
    };
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
    isAuthenticated,
    loading: loading || isCheckingAuth,
    user,
  };
};

export default useAuth;
