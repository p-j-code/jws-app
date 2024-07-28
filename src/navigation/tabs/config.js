// src/navigation/tabs/config.js
import HomeScreen from '../../screens/Home/HomeScreen';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import OrdersScreen from '../../screens/Orders/OrdersScreen';
import CartScreen from '../../screens/Cart/CartScreen';
import ContactScreen from '../../screens/Contact/ContactScreen';
import {APP_NAME} from '../../utils/constants';
import SimpleHeader from '../../components/common/SimpleHeader';

export const bottomTabConfig = [
  {
    name: APP_NAME,
    component: HomeScreen,
    options: {
      tabBarLabel: APP_NAME,
      iconName: 'home-outline',
      iconNameFocused: 'home',
      header: () => <SimpleHeader title="SG Gold" />, // Use the custom header
    },
  },
  {
    name: 'Profile',
    component: ProfileScreen,
    options: {
      tabBarLabel: 'Profile',
      iconName: 'person-outline',
      iconNameFocused: 'person',
      header: () => <SimpleHeader title="Profile" />,
    },
  },
  {
    name: 'Orders',
    component: OrdersScreen,
    options: {
      tabBarLabel: 'Orders',
      iconName: 'list-outline',
      iconNameFocused: 'list',
      header: () => <SimpleHeader title="Orders" />,
    },
  },
  {
    name: 'Cart',
    component: CartScreen,
    options: {
      tabBarLabel: 'Cart',
      iconName: 'cart-outline',
      iconNameFocused: 'cart',
      header: () => <SimpleHeader title="Cart" />,
    },
  },
  {
    name: 'Contact',
    component: ContactScreen,
    options: {
      tabBarLabel: 'Contact',
      iconName: 'call-outline',
      iconNameFocused: 'call',
      header: () => <SimpleHeader title="Cart" />,
    },
  },
];
