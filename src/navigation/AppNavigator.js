import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './stacks/AuthStack';
import MainStack from './stacks/MainStack';
import {navigationRef} from './helpers/navigationHelpers';
import {useSelector} from 'react-redux';
import MessageBanner from '../components/UI/MessageBanner';

const AuthenticatedMainStack = MainStack;
const AuthenticatedAuthStack = AuthStack;

const AppNavigator = () => {
  const {isAuthenticated} = useSelector(state => state.auth);

  return (
    <NavigationContainer ref={navigationRef}>
      {isAuthenticated ? (
        <AuthenticatedMainStack />
      ) : (
        <AuthenticatedAuthStack />
      )}
      <MessageBanner />
    </NavigationContainer>
  );
};

export default AppNavigator;
