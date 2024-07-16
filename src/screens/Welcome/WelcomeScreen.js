import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, typography, spacing} from '../../theme'; // assuming you've saved the theme in a separate file
import {APP_NAME} from '../../utils/constants.js';

const WelcomeScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to {APP_NAME} App!</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.large,
  },

  welcomeText: {
    ...typography.title,
    color: colors.text,
  },
});

export default WelcomeScreen;
