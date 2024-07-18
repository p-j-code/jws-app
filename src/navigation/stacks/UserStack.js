import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {userRoutes, ADDRESSES_SCREEN} from '../routeConfigurations/userRoutes';

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName={ADDRESSES_SCREEN}>
      {Object.entries(userRoutes).map(([routeName, routeConfig]) => (
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

export default UserStack;
