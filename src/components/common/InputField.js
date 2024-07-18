import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, Animated} from 'react-native';
import theme from '../../theme';

const InputField = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  error,
  variant = 'filled', // default variant
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = new Animated.Value(value ? 1 : 0);

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  return (
    <View style={styles.container}>
      {label && variant === 'floating' && (
        <Animated.Text
          style={[
            styles.label,
            {
              top: animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 4],
              }),
              fontSize: animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [16, 12],
              }),
              color: animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  theme.colors.text.secondary,
                  theme.colors.primary.main,
                ],
              }),
            },
          ]}>
          {label}
        </Animated.Text>
      )}
      {label && variant !== 'floating' && (
        <Text style={styles.staticLabel}>{label}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          error && styles.errorInput,
          variantStyles[variant],
        ]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const variantStyles = StyleSheet.create({
  simple: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.main,
    padding: theme.spacing.small,
    paddingTop: theme.spacing.small, // Adjusted for simple variant
    paddingLeft: theme.spacing.medium,
    backgroundColor: 'transparent',
  },
  outlined: {
    borderWidth: 1,
    borderColor: theme.colors.border.main,
    padding: theme.spacing.small,
    paddingLeft: theme.spacing.medium, // Added left padding
    backgroundColor: 'transparent',
    borderRadius: theme.spacing.xsmall,
  },
  filled: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.main,
    padding: theme.spacing.small,
    paddingLeft: theme.spacing.medium, // Added left padding
    backgroundColor: theme.colors.background.subtle,
    borderRadius: theme.spacing.xsmall,
  },
  floating: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.main,
    paddingTop: theme.spacing.large,
    padding: theme.spacing.small,
    paddingLeft: theme.spacing.medium,
    backgroundColor: theme.colors.background.subtle,
  },
});

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.medium,
    position: 'relative',
    width: '100%',
  },
  label: {
    position: 'absolute',
    left: theme.spacing.medium,
    ...theme.typography.subtitle2,
    backgroundColor: 'transparent',
    paddingHorizontal: 1,
    zIndex: 1,
  },
  staticLabel: {
    ...theme.typography.subtitle2,
    marginBottom: theme.spacing.small,
  },
  input: {
    ...theme.typography.body1,
  },
  errorInput: {
    borderColor: theme.colors.status.error,
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.status.error,
    marginTop: theme.spacing.xsmall,
  },
});

export default InputField;
