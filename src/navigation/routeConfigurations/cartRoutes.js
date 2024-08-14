import SimpleHeader from '../../components/common/SimpleHeader';
import withScreenshotProtection from '../../HOC/withScreenshotProtection';
import CartScreen from '../../screens/Cart/CartScreen';
import CheckoutScreen from '../../screens/Cart/CheckoutScreen';

export const ROOT_CART_STACK_NAME = 'CartStack';
// Screen name constants
export const CART_SCREEN = 'Cart';
export const CHECKOUT_SCREEN = 'Checkout';

// Route configurations
export const cartRoutes = {
  [CART_SCREEN]: {
    screen: withScreenshotProtection(CartScreen),
    navigationOptions: {
      header: () => <SimpleHeader title="Cart" showBack />,
    },
  },
  [CHECKOUT_SCREEN]: {
    screen: CheckoutScreen,
    navigationOptions: {headerShown: true, title: 'Checkout'},
  },
};
