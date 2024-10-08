// src/components/CustomHeaderWithCart.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../theme';
import {
  CART_SCREEN,
  ROOT_CART_STACK_NAME,
} from '../../navigation/routeConfigurations/cartRoutes';

const CustomHeaderWithCart = ({title}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        {navigation.canGoBack() && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-outline"
              size={28}
              color={theme.colors.text.light}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(ROOT_CART_STACK_NAME, {screen: CART_SCREEN})
        }>
        <Ionicons
          name="cart"
          size={36}
          color={theme.colors.text.light}
          style={styles.cartIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: theme.colors.background.interactive,
    paddingTop: theme.spacing.small,
    paddingBottom: theme.spacing.small,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.medium,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: theme.colors.text.light,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    marginLeft: theme.spacing.medium,
  },
  cartIcon: {
    paddingHorizontal: theme.spacing.small,
  },
});

export default CustomHeaderWithCart;
