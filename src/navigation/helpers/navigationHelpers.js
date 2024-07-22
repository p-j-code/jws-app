import {createNavigationContainerRef} from '@react-navigation/native';
import {LOGIN_SCREEN} from '../routeConfigurations/authRoutes';
import {WELCOME_SCREEN} from '../routeConfigurations/welcomeRoutes';

export const navigationRef = createNavigationContainerRef();

export const DEFAULT_NOT_AUTH_SCREEN = LOGIN_SCREEN;
export const DEFAULT_AUTH_SCREEN = WELCOME_SCREEN;

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function navigateToLogin() {
  if (navigationRef.isReady()) {
    navigationRef.navigate(DEFAULT_NOT_AUTH_SCREEN);
  }
}
