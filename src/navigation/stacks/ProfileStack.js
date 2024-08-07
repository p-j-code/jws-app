import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  profileRoutes,
  PROFILE_SCREEN,
} from '../routeConfigurations/profileRoutes';
import theme from '../../theme';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={PROFILE_SCREEN}
      screenOptions={{
        headerStyle: theme.header.style,
        headerTintColor: theme.header.tintColor,
        headerTitleStyle: theme.header.titleStyle,
      }}>
      {Object.entries(profileRoutes).map(([routeName, routeConfig]) => (
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

export default ProfileStack;
