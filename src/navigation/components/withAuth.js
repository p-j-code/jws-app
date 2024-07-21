import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  USER_REGISTRATION_OTP_SCREEN,
  PROFILE_SCREEN,
  ADMIN_MESSAGE_SCREEN,
} from '../routeConfigurations/authRoutes';
import useAuth from '../hooks/useAuth';
import {ActivityIndicator, View} from 'react-native';
import {colors} from '../../theme';
import { STATUS_ERROR_CODES } from '../../utils/constants';

const withAuth = WrappedComponent => {
  return props => {
    const {loading, user, error} = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
      if (!loading && user) {
        if (!user.isOtpVerified) {
          navigation.navigate(USER_REGISTRATION_OTP_SCREEN);
        } else if (user.adminMessage) {
          navigation.navigate(ADMIN_MESSAGE_SCREEN,{ message: user.adminMessage});
        } else if (STATUS_ERROR_CODES[user.status]){
          navigation.navigate(ADMIN_MESSAGE_SCREEN, {})
        }
      }
    }, [loading, user, navigation]);

    if (loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
