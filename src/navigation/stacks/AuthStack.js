import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {authRoutes, REGISTER_SCREEN} from '../routeConfigurations/authRoutes';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={REGISTER_SCREEN}>
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