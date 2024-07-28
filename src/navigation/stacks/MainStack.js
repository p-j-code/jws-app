// src/navigation/MainStack.js
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeStack from './WelcomeStack';
import UserStack from './UserStack';
import {ROOT_USER_STACK_NAME} from '../routeConfigurations/userRoutes';
import {ROOT_WELCOME_STACK_NAME} from '../routeConfigurations/welcomeRoutes';
import {ROOT_PRODUCT_STACK_NAME} from '../routeConfigurations/productRoutes';
import ProductStack from './ProductStack';
import BottomTabNavigator from '../tabs/BottomTabNavigator';
import theme from '../../theme';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerStyle: theme.header.style,
        headerTintColor: theme.header.tintColor,
        headerTitleStyle: theme.header.titleStyle,
      }}>
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROOT_USER_STACK_NAME}
        component={UserStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROOT_PRODUCT_STACK_NAME}
        component={ProductStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
