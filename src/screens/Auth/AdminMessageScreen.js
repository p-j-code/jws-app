import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import theme from '../../theme';
import {STATUS_ERROR_CODES} from '../../utils/constants';

const AdminMessageScreen = () => {
  const route = useRoute();
  const {message, errorCode} = route.params;

  const getMessageStyle = () => {
    switch (errorCode) {
      case STATUS_ERROR_CODES.pending:
        return styles.pendingText;
      case STATUS_ERROR_CODES.rejected:
        return styles.rejectedText;
      case STATUS_ERROR_CODES.blocked:
        return styles.blockedText;
      case STATUS_ERROR_CODES['pending-deletion']:
        return styles.pendingDeletionText;
      case 'error':
        return styles.errorText;
      case 'admin':
        return styles.adminText;
      default:
        return styles.defaultText;
    }
  };

  const getDefaultMessage = () => {
    switch (errorCode) {
      case STATUS_ERROR_CODES.pending:
        return 'Your profile is pending approval.';
      case STATUS_ERROR_CODES.rejected:
        return 'Your profile has been rejected.';
      case STATUS_ERROR_CODES.blocked:
        return 'Your profile has been blocked.';
      case STATUS_ERROR_CODES['pending-deletion']:
        return 'Your profile is pending deletion.';
      default:
        return message || 'An unknown error occurred.';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={getMessageStyle()}>{message || getDefaultMessage()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background.default,
  },
  errorText: {
    color: theme.colors.status.error,
  },
  adminText: {
    color: theme.colors.secondary.dark,
  },
  pendingText: {
    color: theme.colors.status.success,
  },
  rejectedText: {
    color: theme.colors.status.error,
  },
  blockedText: {
    color: theme.colors.primary.dark,
  },
  pendingDeletionText: {
    color: theme.colors.status.error,
  },
  defaultText: {
    color: theme.colors.text.primary,
  },
});

export default AdminMessageScreen;
