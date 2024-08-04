import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { cartRoutes, CART_SCREEN } from '../routeConfigurations/cartRoutes';

const Stack = createNativeStackNavigator();

const CartStack = () => {
  return (
    <Stack.Navigator initialRouteName={CART_SCREEN}>
      {Object.entries(cartRoutes).map(([routeName, routeConfig]) => (
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

export default CartStack;
