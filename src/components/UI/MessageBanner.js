// src/components/common/MessageBanner.js

import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearMessage} from '../../store/actions/messageActions';
import theme from '../../theme';

const MessageBanner = () => {
  const dispatch = useDispatch();
  const {message, messageType} = useSelector(state => state.message);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000); // Clear message after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  // const message = 'Testing with Hard Coded Message',
  //   messageType = 'warning';

  if (!message) return null;

  const getBannerStyle = () => {
    switch (messageType) {
      case 'success':
        return styles.success;
      case 'warning':
        return styles.warning;
      case 'error':
        return styles.error;
      default:
        return styles.default;
    }
  };

  return (
    <View style={[styles.bannerContainer, getBannerStyle()]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    padding: theme.spacing.medium,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing.small,
    position: 'absolute',
    top: theme.spacing.large,
    left: theme.spacing.large,
    right: theme.spacing.large,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
    zIndex: 1000, // Ensure the banner is above other elements
  },
  text: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  success: {
    backgroundColor: theme.colors.status.success,
  },
  warning: {
    backgroundColor: theme.colors.secondary.main,
  },
  error: {
    backgroundColor: theme.colors.status.error,
  },
  default: {
    backgroundColor: theme.colors.highlight,
  },
});

export default MessageBanner;
