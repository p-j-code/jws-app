// src/navigation/MainStack.js
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileStack from './ProfileStack';
import {ROOT_PROFILE_STACK_NAME} from '../routeConfigurations/profileRoutes';
import {ROOT_PRODUCT_STACK_NAME} from '../routeConfigurations/productRoutes';
import ProductStack from './ProductStack';
import BottomTabNavigator from '../tabs/BottomTabNavigator';
import theme from '../../theme';
import {ROOT_CART_STACK_NAME} from '../routeConfigurations/cartRoutes';
import CartStack from './CartStack';
import {ROOT_ORDER_STACK_NAME} from '../routeConfigurations/orderRoutes';
import OrderStack from './OrderStack';

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
        name={ROOT_PROFILE_STACK_NAME}
        component={ProfileStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROOT_PRODUCT_STACK_NAME}
        component={ProductStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROOT_CART_STACK_NAME}
        component={CartStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROOT_ORDER_STACK_NAME}
        component={OrderStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
