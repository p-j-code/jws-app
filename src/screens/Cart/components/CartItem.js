import React, {useRef, useCallback, memo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Carousel from '../../../components/common/Carousel';
import QuantityControl from '../../../components/UI/QuantityControl';
import theme from '../../../theme';
import {PRODUCT_DETAILS_SCREEN} from '../../../navigation/routeConfigurations/productRoutes';

const {width} = Dimensions.get('window');
const squareSize = width * 0.3;

const CartItem = memo(({item}) => {
  const navigation = useNavigation();
  const isSwipe = useRef(false);

  const handlePress = useCallback(() => {
    // if (!isSwipe.current && item.product._id) {
    //   navigation.navigate(PRODUCT_DETAILS_SCREEN, {
    //     productId: item.product._id,
    //   });
    // }
  }, [navigation, item.product._id]);

  const formatValue = useCallback(value => parseFloat(value).toFixed(2), []);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.productContainer}>
        <View style={styles.row}>
          <View style={styles.mediaContainer}>
            <Carousel
              data={item.product.media}
              width={squareSize}
              height={squareSize}
              style={{margin: theme.spacing.medium}}
            />
          </View>
          <View style={styles.detailsContainer}>
            {item.product.name && (
              <Text style={styles.productName}>{item.product.name}</Text>
            )}
            {item.product.narration && (
              <Text style={styles.productNarration}>
                {item.product.narration}
              </Text>
            )}
            <Text style={styles.productDetail}>
              Gross Weight: {formatValue(item.grossWeight)}
            </Text>
            <Text style={styles.productDetail}>
              Net Weight: {formatValue(item.netWeight)}
            </Text>
            {item.product.isStone && (
              <>
                <Text style={styles.productDetail}>
                  Stone Weight: {formatValue(item.product.stoneWeight)}
                </Text>
                <Text style={styles.productDetail}>
                  Stone Charges: {formatValue(item.product.stoneCharges)}
                </Text>
              </>
            )}
          </View>
        </View>
        <View style={styles.quantityControlContainer}>
          <QuantityControl
            productId={item.product._id}
            initialQuantity={item.quantity}
            max={item.product.stock}
            size="xsm"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  productContainer: {
    paddingVertical: theme.spacing.medium,
    borderBottomColor: theme.colors.border.main,
    borderBottomWidth: 0.5,
  },
  row: {
    flexDirection: 'row',
  },
  mediaContainer: {
    width: squareSize + theme.spacing.medium * 2,
    marginRight: theme.spacing.medium,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    ...theme.typography.h4,
    marginBottom: theme.spacing.xsmall,
  },
  productNarration: {
    ...theme.typography.body2,
    marginBottom: theme.spacing.small,
  },
  productDetail: {
    ...theme.typography.body1,
    fontSize: theme.typography.body2.fontSize,
    marginBottom: theme.spacing.xsmall,
  },
  quantityControlContainer: {
    width: '100%',
    marginTop: theme.spacing.medium,
    paddingHorizontal: theme.spacing.medium,
  },
});

export default CartItem;
