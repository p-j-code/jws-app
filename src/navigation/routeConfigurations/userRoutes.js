import AddressesScreen from '../../screens/User/AddressesScreen.js';

export const ROOT_USER_STACK_NAME = 'UserRoutes';
// Screen name constants
export const ADDRESSES_SCREEN = 'UserAddresses';

/**
 * User route configurations.
 */
// Route configurations
export const userRoutes = {
  [ADDRESSES_SCREEN]: {
    screen: AddressesScreen,
    navigationOptions: {headerShown: false},
  },
};
