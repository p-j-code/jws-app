import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { welcomeRoutes } from '../routeConfigurations/welcomeRoutes.js';

const Stack = createNativeStackNavigator();

const WelcomeStack = () => {
  return (
    <Stack.Navigator>
      {Object.entries(welcomeRoutes).map(([routeName, routeConfig]) => (
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

export default WelcomeStack;
