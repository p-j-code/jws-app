import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, typography, spacing} from '../../theme'; // assuming you've saved the theme in a separate file
import {APP_NAME} from '../../utils/constants.js';
import {useSelector} from 'react-redux';

const WelcomeScreen = () => {
  const {isAuthenticated, authToken, user, loading} = useSelector(
    state => state.auth,
  );

  console.log({isAuthenticated, authToken, user, loading});
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to {APP_NAME} App!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.large,
    backgroundColor: colors.background.default,
  },
  welcomeText: {
    ...typography.title,
    color: colors.text.primary,
  },
});

export default WelcomeScreen;
