import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from '../../../components/common/Carousel';
import {colors, typography, spacing, shape} from '../../../theme';
import {
  PRODUCT_DETAILS_SCREEN,
  ROOT_PRODUCT_STACK_NAME,
} from '../../../navigation/routeConfigurations/productRoutes';
import {useNavigation} from '@react-navigation/native';
import {formatValue} from '../../../utils/commonUtils';
import withScreenshotProtection from '../../../HOC/withScreenshotProtection';

const OrderItem = ({item}) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigation = useNavigation();

  const handleToggleDetails = useCallback(() => {
    setShowDetails(prevShowDetails => !prevShowDetails);
  }, []);

  const handleNavigateToProduct = () => {
    navigation.navigate(ROOT_PRODUCT_STACK_NAME, {
      screen: PRODUCT_DETAILS_SCREEN,
      params: {productId: item.product._id},
    });
  };

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
                maxSlides={3}
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
              Gross Weight: {formatValue(item.grossWeight)}
            </Text>
            <Text style={styles.itemDetail}>
              Net Weight: {formatValue(item.netWeight)}
            </Text>
            {showDetails && (
              <>
                {item.product.description && (
                  <Text style={styles.itemDetail}>
                    Description: {item.product.description || 'No Description'}
                  </Text>
                )}
                <Text style={styles.itemDetail}>
                  Stone Weight: {formatValue(item.stoneWeight)}
                </Text>
                {item.product.narration && (
                  <Text style={styles.itemNarration}>
                    {item.product.narration}
                  </Text>
                )}
                <Text style={styles.itemDetail}>Type: {item.product.type}</Text>
                {item.product.purity && (
                  <Text style={styles.itemDetail}>
                    Purity: {item.product.purity}
                  </Text>
                )}
                {item.product.isStone && (
                  <>
                    <Text style={styles.itemDetail}>
                      Stone Weight:{' '}
                      {formatValue(item.product.stoneWeight) || 'N/A'}
                    </Text>
                    <Text style={styles.itemDetail}>
                      Stone Charges:{' '}
                      {formatValue(item.product.stoneCharges) || 'N/A'}
                    </Text>
                  </>
                )}
                {item.product?.categories && (
                  <Text style={styles.itemDetail}>
                    Category:
                    {item.product?.categories}
                  </Text>
                )}
                {item.product?.tags?.length ? (
                  <Text style={styles.itemDetail}>
                    Tags: {(item.product.tags || []).join(', ')}
                  </Text>
                ) : null}
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

const squareSize = Dimensions.get('window').width * 0.2;

const styles = StyleSheet.create({
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
});

export default withScreenshotProtection(OrderItem);
