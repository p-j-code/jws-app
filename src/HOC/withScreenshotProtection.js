import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import RNPreventScreenshot, {
  addListener,
} from 'react-native-screenshot-prevent';

const withScreenshotProtection = WrappedComponent => {
  return props => {
    useEffect(() => {
      // Enable screenshot prevention
      RNPreventScreenshot.enabled(true);

      // Enable secure view for iOS 13+
      if (!__DEV__) {
        RNPreventScreenshot.enableSecureView();
      }

      // Add listener for screenshot events
      const subscription = addListener(() => {
        Alert.alert(
          'Warning',
          'You have taken a screenshot of the app. This is prohibited due to security reasons.',
          [{text: 'I understand'}],
        );
      });

      return () => {
        // Disable screenshot prevention
        RNPreventScreenshot.enabled(false);

        // Disable secure view for iOS 13+
        if (!__DEV__) {
          RNPreventScreenshot.disableSecureView();
        }

        // Remove the listener
        subscription.remove();
      };
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withScreenshotProtection;
