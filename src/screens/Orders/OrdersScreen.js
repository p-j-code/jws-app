import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  getOrdersByUserRequest,
  updateOrderStatusByUserRequest,
} from '../../store/actions/orderActions';
import {colors, typography, spacing, shape} from '../../theme';
import Carousel from '../../components/common/Carousel';
import {
  PRODUCT_DETAILS_SCREEN,
  ROOT_PRODUCT_STACK_NAME,
} from '../../navigation/routeConfigurations/productRoutes';
import Button from '../../components/common/Button';

const {width} = Dimensions.get('window');
const squareSize = width * 0.2;

const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
        renderItem={({item}) => (
          <OrderItem item={item} navigation={navigation} />
        )}
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

const OrderItem = ({item, navigation}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = useCallback(() => {
    setShowDetails(prevShowDetails => !prevShowDetails);
  }, []);

  const handleNavigateToProduct = useCallback(() => {
    navigation.navigate(ROOT_PRODUCT_STACK_NAME, {
      screen: PRODUCT_DETAILS_SCREEN,
      params: {productId: item.product._id},
    });
  }, [navigation, item.product._id]);

  return (
    <View style={styles.itemContainer}>
      <TouchableWithoutFeedback onPress={handleNavigateToProduct}>
        <View style={styles.row}>
          <View style={styles.mediaContainer}>
            {item.product.media && (
              <Carousel
                data={item.product.media}
                width={squareSize}
                height={squareSize}
                style={{marginHorizontal: spacing.medium}}
              />
            )}
          </View>
          <View style={styles.detailsContainer}>
            {item.product.name && (
              <Text style={styles.itemName}>
                {item.product.name || 'Unnamed Product'}
              </Text>
            )}

            <Text style={styles.itemDetail}>Quantity: {item.quantity}</Text>
            <Text style={styles.itemDetail}>
              Gross Weight: {item.grossWeight}g
            </Text>
            <Text style={styles.itemDetail}>Net Weight: {item.netWeight}g</Text>
            {showDetails && (
              <>
                <Text style={styles.itemDetail}>
                  Stone Charges: ₹{item.stoneCharges}
                </Text>
                {item.product.narration && (
                  <Text style={styles.itemNarration}>
                    {item.product.narration}
                  </Text>
                )}
              </>
            )}
          </View>
          <TouchableOpacity
            onPress={handleToggleDetails}
            style={styles.toggleDetailsButton}>
            <Icon
              name={showDetails ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={24}
              color={colors.text.primary}
            />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
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
    backgroundColor: colors.background.subtle,
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
  itemContainer: {
    paddingVertical: spacing.medium,
    borderBottomColor: colors.border.main,
    borderBottomWidth: 0.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediaContainer: {
    width: squareSize + spacing.medium * 2,
    marginRight: spacing.medium,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    ...typography.h4,
    marginBottom: spacing.xsmall,
  },
  itemDetail: {
    ...typography.body1,
    fontSize: typography.body2.fontSize,
    marginBottom: spacing.xsmall,
  },
  itemNarration: {
    ...typography.body2,
    marginBottom: spacing.small,
  },
  iconButton: {
    marginLeft: spacing.small,
  },
  toggleDetailsButton: {
    marginLeft: spacing.small,
    borderWidth: 1,
    borderColor: colors.border.main,
    borderRadius: shape.borderRadiusSmall,
    backgroundColor: colors.secondary.light,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.small,
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
