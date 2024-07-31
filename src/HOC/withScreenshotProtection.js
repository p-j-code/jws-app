import React, {useEffect} from 'react';
import RNPreventScreenshot from 'react-native-screenshot-prevent';

const withScreenshotProtection = WrappedComponent => {
  return props => {
    useEffect(() => {
      // Enable screenshot prevention
      RNPreventScreenshot.enabled(true);

      // Enable secure view for iOS 13+
      if (!__DEV__) {
        RNPreventScreenshot.enableSecureView();
      }

      return () => {
        // Disable screenshot prevention
        RNPreventScreenshot.enabled(false);

        // Disable secure view for iOS 13+
        if (!__DEV__) {
          RNPreventScreenshot.disableSecureView();
        }
      };
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withScreenshotProtection;
