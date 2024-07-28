import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  productRoutes,
  PRODUCT_LISTING_SCREEN,
} from '../routeConfigurations/productRoutes';
import theme from '../../theme';

const Stack = createNativeStackNavigator();

const ProductStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={PRODUCT_LISTING_SCREEN}
      screenOptions={{
        headerStyle: theme.header.style,
        headerTintColor: theme.header.tintColor,
        headerTitleStyle: theme.header.titleStyle,
      }}>
      {Object.entries(productRoutes).map(([routeName, routeConfig]) => (
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

export default ProductStack;
