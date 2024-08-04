import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { orderRoutes, ORDER_LIST_SCREEN } from '../routeConfigurations/orderRoutes';

const Stack = createNativeStackNavigator();

const OrderStack = () => {
  return (
    <Stack.Navigator initialRouteName={ORDER_LIST_SCREEN}>
      {Object.entries(orderRoutes).map(([routeName, routeConfig]) => (
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

export default OrderStack;
