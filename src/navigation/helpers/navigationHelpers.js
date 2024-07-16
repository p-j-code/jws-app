import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const DEFAULT_NOT_AUTH_SCREEN = "login"

export const DEFAULT_AUTH_SCREEN = "welcome"

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