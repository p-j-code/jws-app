// src/components/CustomHeader.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../../theme';

const SimpleHeader = ({title}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: theme.colors.background.subtle,
    paddingTop: theme.spacing.small,
    paddingBottom: theme.spacing.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
  },
});

export default SimpleHeader;
