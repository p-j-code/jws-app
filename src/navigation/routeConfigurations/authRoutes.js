import LoginScreen from '../../screens/Auth/LoginScreen.js';
import RegisterScreen from '../../screens/Auth/RegisterScreen.js';
import ForgotPasswordScreen from '../../screens/Auth/ForgotPasswordScreen.js';
import ForgetPasswordOTPScreen from '../../screens/Auth/ForgetPasswordOTPScreen.js';
import UserRegistrationOTPScreen from '../../screens/Auth/UserRegistrationOTPScreen.js';
import AdminMessageScreen from '../../screens/Auth/AdminMessageScreen.js';
import EditProfileScreenAuth from '../../screens/Auth/EditProfileScreenAuth.js';

export const ROOT_AUTH_STACK_NAME = 'AuthRoutes';
// Screen name constants
export const LOGIN_SCREEN = 'Login';
export const REGISTER_SCREEN = 'Register';
export const FORGOT_PASSWORD_SCREEN = 'ForgotPassword';
export const FORGET_PASSWORD_OTP_SCREEN = 'ForgetPasswordOTP';
export const USER_REGISTRATION_OTP_SCREEN = 'UserRegistrationOTP';
export const ADMIN_MESSAGE_SCREEN = 'AdminMessageScreen';
export const EDIT_PROFILE_SCREEN_AUTH = 'EditProfileScreenAuth';

/**
 * Auth route configurations.
 */
// Route configurations
export const authRoutes = {
  [LOGIN_SCREEN]: {
    screen: LoginScreen,
    navigationOptions: {headerShown: false},
  },
  [REGISTER_SCREEN]: {
    screen: RegisterScreen,
    navigationOptions: {headerShown: false},
  },
  [FORGOT_PASSWORD_SCREEN]: {
    screen: ForgotPasswordScreen,
    navigationOptions: {headerShown: false},
  },
  [FORGET_PASSWORD_OTP_SCREEN]: {
    screen: ForgetPasswordOTPScreen,
    navigationOptions: {headerShown: true, title: 'Reset Password OTP'},
  },
  [USER_REGISTRATION_OTP_SCREEN]: {
    screen: UserRegistrationOTPScreen,
    navigationOptions: {headerShown: false, title: 'Registration OTP'},
  },
  [ADMIN_MESSAGE_SCREEN]: {
    screen: AdminMessageScreen,
    navigationOptions: {headerShown: false},
  },
  [EDIT_PROFILE_SCREEN_AUTH]: {
    screen: EditProfileScreenAuth,
    navigationOptions: {headerShown: false},
  },
};
