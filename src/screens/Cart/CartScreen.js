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
import {createOrderFromCartRequest} from '../../store/actions/orderActions';
import CartItem from './components/CartItem';
import Button from '../../components/common/Button';
import theme from '../../theme';
import {
  selectCartItems,
  selectCartTotals,
} from '../../store/selectors/cartSelectors';
import {
  selectOrderLoading,
  selectOrderError,
} from '../../store/selectors/orderSelectors';
import {ORDER_TAB} from '../../navigation/tabs/config';

const CartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems, shallowEqual);
  const cartTotals = useSelector(selectCartTotals, shallowEqual);
  const orderLoading = useSelector(selectOrderLoading);
  const orderError = useSelector(selectOrderError);

  useEffect(() => {
    dispatch(getCartRequest());
  }, [dispatch]);

  const renderItem = useCallback(({item}) => <CartItem item={item} />, []);

  const handlePlaceOrder = () => {
    dispatch(
      createOrderFromCartRequest(() => {
        dispatch(getCartRequest());
        navigation.navigate(ORDER_TAB);
      }),
    );
  };

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
            <View style={styles.totalsRow}>
              <View style={styles.column}>
                <Text style={styles.totalText}>
                  Total Items: {cartTotals.totalItems}
                </Text>
                {cartTotals.totalStoneCharges !== 0 && (
                  <Text style={styles.totalText}>
                    Stone Charges: {cartTotals.totalStoneCharges}
                  </Text>
                )}
              </View>
              <View style={styles.column}>
                <Text style={styles.totalText}>
                  Net Weight: {cartTotals.totalNetWeight}
                </Text>
                <Text style={styles.totalText}>
                  Gross Weight: {cartTotals.totalGrossWeight}
                </Text>
              </View>
            </View>
            <Button
              title="Place Order"
              onPress={handlePlaceOrder}
              disabled={cartItems.length === 0 || orderLoading}
              size="sm"
              style={styles.placeOrderButton}
            />
            {orderLoading && (
              <ActivityIndicator size="large" color={theme.colors.primary} />
            )}
            {orderError && <Text style={styles.errorText}>{orderError}</Text>}
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: theme.colors.background.default,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
  totalText: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.small,
    textAlign: 'left',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeOrderButton: {
    marginTop: theme.spacing.medium,
    alignSelf: 'center',
    width: '100%',
  },
  errorText: {
    ...theme.typography.body2,
    color: theme.colors.error,
    textAlign: 'center',
    marginTop: theme.spacing.small,
  },
});

export default CartScreen;
