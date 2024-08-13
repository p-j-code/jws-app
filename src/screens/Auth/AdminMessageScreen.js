import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import theme from '../../theme';
import {STATUS_ERROR_CODES} from '../../utils/constants';
import Button from '../../components/common/Button';
import {getUserRequest, logoutUser} from '../../store/actions/authActions';
import {
  EDIT_PROFILE_SCREEN_AUTH,
  LOGIN_SCREEN,
} from '../../navigation/routeConfigurations/authRoutes';
import withAuth from '../../navigation/components/withAuth';

const AdminMessageScreen = ({navigation, checkAuth}) => {
  const {
    loading,
    user = {},
    error: errorCode,
  } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true; // Prevent default back action
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.navigate(LOGIN_SCREEN);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // checkAuth &&
    dispatch(getUserRequest());

    // Simulating refresh action, set timeout to stop refreshing after 1 second
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

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
        return 'Your profile approval is pending. Please wait for the administrator to review your details.';
      case STATUS_ERROR_CODES.rejected:
        return 'Your profile has been rejected. Please contact support for further assistance.';
      case STATUS_ERROR_CODES.blocked:
        return 'Your profile has been blocked due to a violation of our terms of service.';
      case STATUS_ERROR_CODES['pending-deletion']:
        return 'Your profile is pending deletion. Please contact support if this is a mistake.';
      default:
        return (
          user?.adminMessage ||
          'An unknown error occurred. Please try again later.'
        );
    }
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary.main} />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.colors.primary.main]} // Use theme color for the spinner
        />
      }>
      <Text style={[styles.messageText, getMessageStyle()]}>
        {user?.adminMessage || getDefaultMessage()}
      </Text>

      {user?.canUpdateProfile && (
        <Button
          title="Update Profile"
          onPress={() => navigation.navigate(EDIT_PROFILE_SCREEN_AUTH)}
          type="outline"
          size="sm"
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Logout" type="text" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background.default,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.default,
  },
  messageText: {
    ...theme.typography.h4,
    textAlign: 'center',
    marginVertical: theme.spacing.medium,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.medium,
  },
});

export default withAuth(AdminMessageScreen);
