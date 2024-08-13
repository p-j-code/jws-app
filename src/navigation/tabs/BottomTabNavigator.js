// src/navigation/tabs/BottomTabNavigator.js
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {bottomTabConfig} from './config';
import theme from '../../theme';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          const tab = bottomTabConfig.find(tab => tab.name === route.name);
          const iconName = focused
            ? tab.options.iconNameFocused
            : tab.options.iconName;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary.main,
        tabBarInactiveTintColor: theme.colors.secondary.main,
        tabBarStyle: {
          backgroundColor: theme.colors.background.default,
          paddingBottom: theme.spacing.small,
          paddingTop: theme.spacing.small,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: theme.typography.caption.fontSize,
          fontWeight: theme.typography.body2.fontWeight,
        },
        header: ({navigation, route, options}) => {
          const tab = bottomTabConfig.find(tab => tab.name === route.name);
          if (tab.options.header) {
            return tab.options.header();
          }
          return null;
        },
      })}>
      {bottomTabConfig.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={tab.options}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
