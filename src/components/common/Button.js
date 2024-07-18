import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import theme from '../../theme';

const Button = ({title, onPress, variant = 'primary', size = 'md'}) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], styles[size]]}
      onPress={onPress}>
      <Text style={[styles.buttonText, styles[`${variant}Text`]]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.spacing.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: theme.colors.primary.main,
  },
  secondary: {
    backgroundColor: theme.colors.secondary.main,
  },
  success: {
    backgroundColor: theme.colors.status.success,
  },
  error: {
    backgroundColor: theme.colors.status.error,
  },
  sm: {
    padding: theme.spacing.small,
  },
  md: {
    padding: theme.spacing.medium,
  },
  lg: {
    padding: theme.spacing.large,
  },
  buttonText: {
    color: theme.colors.text.primary,
    ...theme.typography.h4,
  },
  primaryText: {
    color: theme.colors.text.primary,
  },
  secondaryText: {
    color: theme.colors.text.secondary,
  },
  successText: {
    color: theme.colors.text.primary,
  },
  errorText: {
    color: theme.colors.text.primary,
  },
});

export default Button;
