import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getOrdersByUserRequest,
  updateOrderStatusByUserRequest,
} from '../../store/actions/orderActions';
import {colors, typography, spacing, shape} from '../../theme';
import Button from '../../components/common/Button';
import OrderItem from './components/OrderItem';
import withScreenshotProtection from '../../HOC/withScreenshotProtection';
import {formatValue} from '../../utils/commonUtils';

const OrderScreen = () => {
  const dispatch = useDispatch();
  const {orders, loading, error} = useSelector(state => state.order);
  const [refreshing, setRefreshing] = useState(false);

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
        Total Gross Weight: {formatValue(item.totalGrossWeight)}
      </Text>
      <Text style={styles.totalWeight}>
        Total Net Weight: {formatValue(item.totalNetWeight)}
      </Text>
      {item.totalStoneWeight !== 0 && item.totalStoneWeight && (
        <Text style={styles.totalCharges}>
          Total Stone Weight: {formatValue(item.totalStoneWeight)}
        </Text>
      )}
    </View>
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getOrdersByUserRequest());
    setRefreshing(false);
  }, [dispatch]);

  if (loading && !refreshing) {
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
      {orders.length === 0 ? (
        <View style={styles.noOrdersContainer}>
          <Text style={styles.noOrdersText}>No orders available</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary.main]}
            />
          }
        />
      )}
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
    backgroundColor: colors.text.light,
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
  noOrdersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrdersText: {
    ...typography.body1,
    color: colors.text.secondary,
  },
});

export default withScreenshotProtection(OrderScreen);
