import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  cartRoutes,
  CART_SCREEN,
  CHECKOUT_SCREEN,
} from '../routeConfigurations/cartRoutes';
import withScreenshotProtection from '../../HOC/withScreenshotProtection';
import CheckoutScreen from '../../screens/Cart/CheckoutScreen';

const Stack = createNativeStackNavigator();

// Wrapping CartScreen with withScreenshotProtection
const ProtectedCartScreen = withScreenshotProtection(
  cartRoutes[CART_SCREEN].screen,
);

const CartStack = () => {
  return (
    <Stack.Navigator initialRouteName={CART_SCREEN}>
      <Stack.Screen
        name={CART_SCREEN}
        component={ProtectedCartScreen}
        options={cartRoutes[CART_SCREEN].navigationOptions}
      />
      <Stack.Screen
        name={CHECKOUT_SCREEN}
        component={CheckoutScreen}
        options={cartRoutes[CHECKOUT_SCREEN].navigationOptions}
      />
    </Stack.Navigator>
  );
};

export default CartStack;
