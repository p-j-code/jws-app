import React from 'react';
import {Text, StyleSheet} from 'react-native';
import theme from '../../theme';

const Title = ({
  children,
  variant = 'h1',
  color = 'primary',
  position = 'left',
  style,
}) => {
  return (
    <Text
      style={[
        styles[variant],
        styles[`${color}Text`],
        styles[position],
        styles.basic,
        style,
      ]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  basic: {marginBottom: theme.spacing.medium},
  h1: {
    ...theme.typography.h1,
  },
  h2: {
    ...theme.typography.h2,
  },
  h3: {
    ...theme.typography.h3,
  },
  h4: {
    ...theme.typography.h4,
  },
  body1: {
    ...theme.typography.body1,
  },
  body2: {
    ...theme.typography.body2,
  },
  subtitle1: {
    ...theme.typography.subtitle1,
  },
  subtitle2: {
    ...theme.typography.subtitle2,
  },
  caption: {
    ...theme.typography.caption,
  },
  primaryText: {
    color: theme.colors.text.primary,
  },
  secondaryText: {
    color: theme.colors.text.secondary,
  },
  disabledText: {
    color: theme.colors.text.disabled,
  },
  successText: {
    color: theme.colors.status.success,
  },
  errorText: {
    color: theme.colors.status.error,
  },
  left: {
    textAlign: 'left',
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
});

export default Title;
