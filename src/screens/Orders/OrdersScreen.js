import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getOrdersByUserRequest,
  updateOrderStatusByUserRequest,
} from '../../store/actions/orderActions';
import {colors, typography, spacing, shape} from '../../theme';
import Button from '../../components/common/Button';
import OrderItem from './components/OrderItem';

const OrderScreen = () => {
  const dispatch = useDispatch();
  const {orders, loading, error} = useSelector(state => state.order);

  useEffect(() => {
    dispatch(getOrdersByUserRequest());
  }, [dispatch]);

  const handleCancelOrder = orderId => {
    dispatch(updateOrderStatusByUserRequest(orderId, 'UserCancelled'));
  };

  const getStatusStyle = status => {
    switch (status) {
      case 'Pending':
        return styles.statusPending;
      case 'AdminAccepted':
        return styles.statusAccepted;
      case 'AdminRejected':
        return styles.statusRejected;
      case 'UserCancelled':
        return styles.statusCancelled;
      case 'AdminCompleted':
        return styles.statusCompleted;
      default:
        return styles.statusDefault;
    }
  };

  const getStatusText = status => {
    switch (status) {
      case 'Pending':
        return 'Pending';
      case 'AdminAccepted':
        return 'Admin Accepted';
      case 'AdminRejected':
        return 'Admin Rejected';
      case 'UserCancelled':
        return 'Cancelled';
      case 'AdminCompleted':
        return 'Admin Completed';
      default:
        return 'Unknown Status';
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.orderContainer}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order ID: {item.orderId}</Text>
        {item.orderStatus === 'Pending' && (
          <Button
            onPress={() => handleCancelOrder(item._id)}
            title={'Cancel'}
            type="text"
            size="xsm"
            variant="error"
          />
        )}
      </View>
      <Text style={[styles.orderStatus, getStatusStyle(item.orderStatus)]}>
        Status: {getStatusText(item.orderStatus)}
      </Text>
      <FlatList
        data={item.items}
        renderItem={({item}) => <OrderItem item={item} />}
        keyExtractor={item => item._id}
      />
      <Text style={styles.totalItems}>Total Items: {item.totalItems}</Text>
      <Text style={styles.totalWeight}>
        Total Gross Weight: {item.totalGrossWeight}g
      </Text>
      <Text style={styles.totalWeight}>
        Total Net Weight: {item.totalNetWeight}g
      </Text>
      <Text style={styles.totalCharges}>
        Total Stone Charges: ₹{item.totalStoneCharges}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary.main} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
    padding: spacing.medium,
  },
  orderContainer: {
    backgroundColor: colors.primary.light,
    padding: spacing.medium,
    borderRadius: shape.borderRadius,
    marginBottom: spacing.medium,
    borderColor: colors.border.main,
    borderWidth: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.small,
  },
  orderStatus: {
    ...typography.body1,
    marginBottom: spacing.medium,
  },
  statusPending: {
    color: colors.status.warning,
  },
  statusAccepted: {
    color: colors.status.success,
  },
  statusRejected: {
    color: colors.status.error,
  },
  statusCancelled: {
    color: colors.status.cancelled,
  },
  statusCompleted: {
    color: colors.status.completed,
  },
  statusDefault: {
    color: colors.text.primary,
  },
  cancelButton: {
    backgroundColor: colors.status.error,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: shape.borderRadiusSmall,
  },
  cancelButtonText: {
    ...typography.body2,
    color: colors.background.default,
  },
  totalItems: {
    ...typography.subtitle1,
    color: colors.text.primary,
    marginTop: spacing.medium,
  },
  totalWeight: {
    ...typography.subtitle2,
    color: colors.text.primary,
  },
  totalCharges: {
    ...typography.subtitle2,
    color: colors.text.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...typography.body1,
    color: colors.status.error,
  },
});

export default OrderScreen;
