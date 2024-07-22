// src/components/common/MessageBanner.js

import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearMessage} from '../../store/actions/messageActions';

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
    <View style={[styles.banner, getBannerStyle()]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
  success: {
    backgroundColor: 'green',
  },
  warning: {
    backgroundColor: 'orange',
  },
  error: {
    backgroundColor: 'red',
  },
  default: {
    backgroundColor: 'blue',
  },
});

export default MessageBanner;
