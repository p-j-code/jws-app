import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {userRoutes, ADDRESSES_SCREEN} from '../routeConfigurations/userRoutes';
import theme from '../../theme';

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ADDRESSES_SCREEN}
      screenOptions={{
        headerStyle: theme.header.style,
        headerTintColor: theme.header.tintColor,
        headerTitleStyle: theme.header.titleStyle,
      }}>
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
