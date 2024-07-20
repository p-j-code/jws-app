import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import AuthStack from './stacks/AuthStack.js';
import MainStack from './stacks/MainStack';
import {navigationRef} from './helpers/navigationHelpers';
import {getUserRequest} from '../store/actions/authActions';
import {USER_REGISTRATION_OTP_SCREEN} from './routeConfigurations/authRoutes';
import {StyleSheet} from 'react-native';

const AppNavigator = () => {
  const dispatch = useDispatch();
  const {isAuthenticated, authToken, user} = useSelector(state => state.auth);

  useEffect(() => {
    if (authToken) {
      dispatch(getUserRequest());
    }
  }, [authToken]);

  useEffect(() => {
    console.log({user});
    if (user && !user.isOtpVerified) {
      navigationRef.current?.navigate(USER_REGISTRATION_OTP_SCREEN);
    }
  }, [user]);

  return (
    <NavigationContainer ref={navigationRef}>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
      {user?.adminMessage && (
        <View style={styles.adminMessageContainer}>
          <Text style={styles.adminMessageText}>{user.adminMessage}</Text>
          {user.canUpdateProfile && (
            <Button
              title="Update Profile"
              onPress={() => navigationRef.current?.navigate('ProfileScreen')}
            />
          )}
        </View>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  adminMessageContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    padding: 16,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminMessageText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AppNavigator;
