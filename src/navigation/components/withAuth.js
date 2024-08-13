import React, {useEffect, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  USER_REGISTRATION_OTP_SCREEN,
  ADMIN_MESSAGE_SCREEN,
  LOGIN_SCREEN,
} from '../routeConfigurations/authRoutes';
import useAuth from '../hooks/useAuth';
import {ActivityIndicator, View} from 'react-native';
import {colors} from '../../theme';
import {STATUS_ERROR_CODES} from '../../utils/constants';
import {useDispatch} from 'react-redux';
import {setMainAccess} from '../../store/actions/authActions';

const withAuth = WrappedComponent => {
  return props => {
    const {loading, user, checkAuth} = useAuth();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const redirect = useMemo(() => {
      return () => {
        if (!user) return navigation.navigate(LOGIN_SCREEN);
        if (!user.isOtpVerified) {
          navigation.navigate(USER_REGISTRATION_OTP_SCREEN);
        } else if (user.adminMessage) {
          navigation.navigate(ADMIN_MESSAGE_SCREEN, {
            message: user.adminMessage,
          });
        } else if (STATUS_ERROR_CODES[user.status]) {
          navigation.navigate(ADMIN_MESSAGE_SCREEN);
        } else {
          dispatch(setMainAccess(user && user.status === 'accepted'));
        }
      };
    }, [user, navigation, dispatch]);

    useEffect(() => {
      console.log('withAuth useEffect', {loading, user});
      if (!loading && user) {
        redirect();
      }
    }, [loading, user, redirect]);

    if (loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      );
    }

    return (
      <WrappedComponent
        {...props}
        checkAuth={async () => {
          await checkAuth(true);
          redirect();
        }}
      />
    );
  };
};

export default withAuth;
