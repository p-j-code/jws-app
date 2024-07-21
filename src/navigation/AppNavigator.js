import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './stacks/AuthStack';
import MainStack from './stacks/MainStack';
import {navigationRef} from './helpers/navigationHelpers';
import withAuth from './components/withAuth';
import {useSelector} from 'react-redux';

const AuthenticatedMainStack = withAuth(MainStack);
const AuthenticatedAuthStack = withAuth(AuthStack);

const AppNavigator = () => {
  const {isAuthenticated} = useSelector(state => state.auth);

  return (
    <NavigationContainer ref={navigationRef}>
      {isAuthenticated ? (
        <AuthenticatedMainStack />
      ) : (
        <AuthenticatedAuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
