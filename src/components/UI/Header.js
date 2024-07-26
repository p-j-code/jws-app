// src/components/UI/Header.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../../theme';

const Header = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary.main,
    padding: theme.spacing.medium,
  },
  title: {
    fontSize: theme.typography.h1.fontSize,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.h1.fontWeight,
  },
});

export default Header;
