import React, {useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {getCartRequest} from '../../store/actions/cartActions';
import CartItem from './components/CartItem';
import theme from '../../theme';
import {
  selectCartItems,
  selectCartTotals,
  selectCartLoading,
} from '../../store/selectors/cartSelectors';

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems, shallowEqual);
  const cartTotals = useSelector(selectCartTotals, shallowEqual);

  useEffect(() => {
    dispatch(getCartRequest());
  }, [dispatch]);

  const renderItem = useCallback(({item}) => <CartItem item={item} />, []);

  return (
    <View style={styles.container}>
      {cartItems && cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.product._id}
            contentContainerStyle={styles.listContainer}
          />
          <View style={styles.totalsContainer}>
            <Text style={styles.totalText}>
              Total Items: {cartTotals.totalItems}
            </Text>
            <Text style={styles.totalText}>
              Total Gross Weight: {cartTotals.totalGrossWeight}
            </Text>
            <Text style={styles.totalText}>
              Total Net Weight: {cartTotals.totalNetWeight}
            </Text>
            <Text style={styles.totalText}>
              Total Stone Charges: {cartTotals.totalStoneCharges}
            </Text>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  listContainer: {
    paddingBottom: theme.spacing.large,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    ...theme.typography.body1,
    color: theme.colors.text.secondary,
  },
  totalsContainer: {
    padding: theme.spacing.medium,
    borderTopColor: theme.colors.border.main,
    borderTopWidth: 0.5,
  },
  totalText: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.small,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartScreen;
