import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import theme from '../../theme';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  type = 'contained',
  style,
  accessibilityLabel,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[size],
        type === 'contained' && styles[`${variant}Contained`],
        type === 'outline' && styles.outlineButton,
        type === 'outline' && styles[`${variant}Outline`],
        type === 'text' && styles.textButton,
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={!disabled ? onPress : null}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
      accessible={true}
      disabled={disabled}>
      <Text
        style={[
          styles.buttonText,
          size === 'xsm' && styles.xsmText,
          type === 'contained' && styles.containedText,
          type === 'outline' && styles[`${variant}OutlineText`],
          type === 'text' && styles[`${variant}TextText`],
          disabled && styles.disabledText,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.spacing.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButton: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  textButton: {
    backgroundColor: 'transparent',
  },
  primaryContained: {
    backgroundColor: theme.colors.primary.main,
  },
  secondaryContained: {
    backgroundColor: theme.colors.secondary.main,
  },
  successContained: {
    backgroundColor: theme.colors.status.success,
  },
  errorContained: {
    backgroundColor: theme.colors.status.error,
  },
  primaryOutline: {
    borderColor: theme.colors.primary.main,
  },
  secondaryOutline: {
    borderColor: theme.colors.secondary.main,
  },
  successOutline: {
    borderColor: theme.colors.status.success,
  },
  errorOutline: {
    borderColor: theme.colors.status.error,
  },
  xsm: {
    padding: theme.spacing.xsmall,
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
    ...theme.typography.h4,
  },
  primaryText: {
    color: theme.colors.text.primary,
  },
  secondaryText: {
    color: theme.colors.text.primary,
  },
  successText: {
    color: theme.colors.text.primary,
  },
  errorText: {
    color: theme.colors.text.primary,
  },
  containedText: {
    color: theme.colors.text.light,
  },
  primaryOutlineText: {
    color: theme.colors.primary.main,
  },
  secondaryOutlineText: {
    color: theme.colors.secondary.main,
  },
  successOutlineText: {
    color: theme.colors.status.success,
  },
  errorOutlineText: {
    color: theme.colors.status.error,
  },
  primaryTextText: {
    color: theme.colors.primary.main,
  },
  secondaryTextText: {
    color: theme.colors.secondary.main,
  },
  successTextText: {
    color: theme.colors.status.success,
  },
  errorTextText: {
    color: theme.colors.status.error,
  },
  xsmText: {
    ...theme.typography.body1,
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
  disabledButton: {
    backgroundColor: theme.colors.background.disabled,
  },
  disabledText: {
    color: theme.colors.text.disabled,
  },
});

export default Button;
