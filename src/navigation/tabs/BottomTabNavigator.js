// src/navigation/tabs/BottomTabNavigator.js
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import OrdersScreen from '../../screens/Orders/OrdersScreen';
import CartScreen from '../../screens/Cart/CartScreen';
import ContactScreen from '../../screens/Contact/ContactScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../theme';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Orders':
              iconName = focused ? 'list' : 'list-outline';
              break;
            case 'Cart':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'Contact':
              iconName = focused ? 'call' : 'call-outline';
              break;
            default:
              iconName = 'circle';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary.main,
        tabBarInactiveTintColor: theme.colors.text.disabled,
        tabBarStyle: {
          backgroundColor: theme.colors.background.default,
          paddingBottom: theme.spacing.small,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: theme.typography.caption.fontSize,
          fontWeight: theme.typography.body2.fontWeight,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarLabel: 'Home'}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{tabBarLabel: 'Profile'}}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{tabBarLabel: 'Orders'}}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{tabBarLabel: 'Cart'}}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{tabBarLabel: 'Contact'}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
