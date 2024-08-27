// src/navigation/tabs/config.js
import HomeScreen from '../../screens/Home/HomeScreen';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import OrdersScreen from '../../screens/Orders/OrdersScreen';
import ContactScreen from '../../screens/Contact/ContactScreen';
import {APP_NAME} from '../../utils/constants';
import SimpleHeader from '../../components/common/SimpleHeader';
import CustomHeaderWithCart from '../../components/common/CustomHeaderWithCart';

export const ORDER_TAB = 'Orders';
export const PROFILE_TAB = 'Profile';
export const HOME_TAB = APP_NAME;
export const CONTACT_TAB = 'Contact';

export const bottomTabConfig = [
  {
    name: APP_NAME,
    component: HomeScreen,
    options: {
      tabBarLabel: APP_NAME,
      iconName: 'home-outline',
      iconNameFocused: 'home',
      header: () => <CustomHeaderWithCart title="SG Gold" />, // Use the custom header
    },
  },
  {
    name: PROFILE_TAB,
    component: ProfileScreen,
    options: {
      tabBarLabel: 'Profile',
      iconName: 'person-outline',
      iconNameFocused: 'person',
      header: () => <SimpleHeader title="Profile" />,
    },
  },
  {
    name: ORDER_TAB,
    component: OrdersScreen,
    options: {
      tabBarLabel: 'Orders',
      iconName: 'list-outline',
      iconNameFocused: 'list',
      header: () => <SimpleHeader title="Orders" />,
    },
  },
  // {
  //   name: 'Cart',
  //   component: CartScreen,
  //   options: {
  //     tabBarLabel: 'Cart',
  //     iconName: 'cart-outline',
  //     iconNameFocused: 'cart',
  //     header: () => <SimpleHeader title="Cart" />,
  //   },
  // },
  // {
  //   name: CONTACT_TAB,
  //   component: ContactScreen,
  //   options: {
  //     tabBarLabel: 'Contact',
  //     iconName: 'call-outline',
  //     iconNameFocused: 'call',
  //     header: () => <SimpleHeader title="Contact" />,
  //   },
  // },
];
