import OrderListScreen from '../../screens/Orders/OrderListScreen';
import OrderDetailsScreen from '../../screens/Orders/OrderDetailsScreen';

export const ROOT_ORDER_STACK_NAME = 'OrderStack';
// Screen name constants
export const ORDER_LIST_SCREEN = 'OrderList';
export const ORDER_DETAILS_SCREEN = 'OrderDetails';

// Route configurations
export const orderRoutes = {
  [ORDER_LIST_SCREEN]: {
    screen: OrderListScreen,
    navigationOptions: { headerShown: true, title: 'Orders' },
  },
  [ORDER_DETAILS_SCREEN]: {
    screen: OrderDetailsScreen,
    navigationOptions: { headerShown: true, title: 'Order Details' },
  },
};
