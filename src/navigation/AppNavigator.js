import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './stacks/AuthStack';
import MainStack from './stacks/MainStack';
import {navigationRef} from './helpers/navigationHelpers';
import {useSelector} from 'react-redux';
import MessageBanner from '../components/UI/MessageBanner';

const AppNavigator = () => {
  const {hasMainAccess} = useSelector(state => state.auth);

  console.log({hasMainAccess});

  return (
    <NavigationContainer ref={navigationRef}>
      {hasMainAccess ? <MainStack /> : <AuthStack />}
      <MessageBanner />
    </NavigationContainer>
  );
};

export default AppNavigator;
