// src/navigation/AuthStack.js
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {authRoutes, REGISTER_SCREEN} from '../routeConfigurations/authRoutes';
import theme from '../../theme';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={REGISTER_SCREEN}
      screenOptions={{
        headerStyle: theme.header.style,
        headerTintColor: theme.header.tintColor,
        headerTitleStyle: theme.header.titleStyle,
      }}>
      {Object.entries(authRoutes).map(([routeName, routeConfig]) => (
        <Stack.Screen
          key={routeName}
          name={routeName}
          component={routeConfig.screen}
          options={routeConfig.navigationOptions}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AuthStack;
