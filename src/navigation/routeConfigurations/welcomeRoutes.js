import WelcomeScreen from '../../screens/Welcome/WelcomeScreen.js';

export const ROOT_WELCOME_STACK_NAME = 'WelcomeStack';
export const WELCOME_SCREEN = 'Welcome';

export const welcomeRoutes = {
  [WELCOME_SCREEN]: {
    screen: WelcomeScreen,
    navigationOptions: {headerShown: false, title: 'Welcome'},
  },
};
