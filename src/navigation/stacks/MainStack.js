import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeStack from './WelcomeStack.js';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName={ROOT_WELCOME_STACK_NAME}>
      <Stack.Screen
        name={ROOT_WELCOME_STACK_NAME}
        component={WelcomeStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
