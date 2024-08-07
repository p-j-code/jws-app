import EditProfileScreen from '../../screens/Profile/EditProfileScreen';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import UpdatePasswordScreen from '../../screens/Profile/UpdatePasswordScreen';

export const ROOT_PROFILE_STACK_NAME = 'UserRoutes';
// Screen name constants
export const PROFILE_SCREEN = 'ProfileScreen';
export const UPDATE_PASSWORD_SCREEN = 'UpdatePasswordScreen';
export const EDIT_PROFILE_SCREEN = 'EditProfileScreen';

/**
 * User route configurations.
 */
// Route configurations
export const profileRoutes = {
  [PROFILE_SCREEN]: {
    screen: ProfileScreen,
    navigationOptions: {headerShown: false},
  },
  [UPDATE_PASSWORD_SCREEN]: {
    screen: UpdatePasswordScreen,
    navigationOptions: {headerShown: false},
  },
  [EDIT_PROFILE_SCREEN]: {
    screen: EditProfileScreen,
    navigationOptions: {headerShown: false},
  },
};
