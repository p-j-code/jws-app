import React from 'react';
import {View, StyleSheet} from 'react-native';
import theme from '../../theme';
import CategoryList from '../Category/CategoryList';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <CategoryList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
});

export default HomeScreen;
