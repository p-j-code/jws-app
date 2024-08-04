import CartScreen from '../../screens/Cart/CartScreen';
import CheckoutScreen from '../../screens/Cart/CheckoutScreen';

export const ROOT_CART_STACK_NAME = 'CartStack';
// Screen name constants
export const CART_SCREEN = 'Cart';
export const CHECKOUT_SCREEN = 'Checkout';

// Route configurations
export const cartRoutes = {
  [CART_SCREEN]: {
    screen: CartScreen,
    navigationOptions: { headerShown: true, title: 'Cart' },
  },
  [CHECKOUT_SCREEN]: {
    screen: CheckoutScreen,
    navigationOptions: { headerShown: true, title: 'Checkout' },
  },
};
