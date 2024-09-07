import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../../theme';

const ProductFlags = ({flags}) => {
  if (!flags || flags.length === 0) {
    return null;
  }

  return (
    <View style={styles.flagsContainer}>
      {flags.map((flag, index) => (
        <View
          key={index}
          style={[styles.flagContainer, styles[`${flag.name}Flag`]]}>
          <Text style={styles.flagText}>{flag.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  flagsContainer: {
    position: 'absolute',
    top: theme.spacing.small,
    left: theme.spacing.small,
    zIndex: 10,
  },
  flagContainer: {
    backgroundColor: theme.colors.primary.main,
    borderRadius: theme.spacing.xsmall,
    paddingVertical: theme.spacing.xsmall,
    paddingHorizontal: theme.spacing.small,
    marginBottom: theme.spacing.xsmall, // Space between flags
  },
  flagText: {
    color: theme.colors.text.onPrimary,
    ...theme.typography.body2,
  },
  // Specific styles for different types of flags, can be extended further
  newFlag: {
    backgroundColor: theme.colors.status.success,
  },
  topFlag: {
    backgroundColor: theme.colors.status.warning,
  },
});

export default ProductFlags;
