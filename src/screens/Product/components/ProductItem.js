import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Carousel from '../../../components/common/Carousel'; // Import the custom Carousel component
import theme from '../../../theme';
import {PRODUCT_DETAILS_SCREEN} from '../../../navigation/routeConfigurations/productRoutes';
import QuantityControl from '../../../components/UI/QuantityControl';
import ProductFlags from '../../../components/UI/ProductFlags';

const {width} = Dimensions.get('window');
const squareSize = width * 0.4;
const carouselHeight = squareSize * 1;

const ProductItem = ({item}) => {
  const navigation = useNavigation();
  const isSwipe = useRef(false);

  const handlePress = () => {
    if (!isSwipe.current && item._id) {
      navigation.navigate(PRODUCT_DETAILS_SCREEN, {productId: item._id});
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.productContainer}>
        <View style={styles.mediaContainer}>
          {/* Pass the flags array to the ProductFlags component */}
          <ProductFlags flags={item.flags} />

          <Carousel
            data={item.media}
            width={squareSize}
            height={carouselHeight}
          />
        </View>
        <View style={styles.detailsContainer}>
          <View>
            {item.name && (
              <Text style={styles.productName}>{item.name || 'No Name'}</Text>
            )}
            {item.narration && (
              <Text style={styles.productNarration}>
                {item.narration || 'No Narration'}
              </Text>
            )}
            <Text style={styles.productDetail}>
              Gross: {item.grossWeight || 'N/A'}
            </Text>
            <Text style={styles.productDetail}>
              Net: {item.netWeight || 'N/A'}
            </Text>
            {item.isStone && (
              <Text style={styles.productDetail}>
                Stone: {item.stoneWeight || 'N/A'}
              </Text>
            )}
            {/* {item.isStone && (
              <Text style={styles.productDetail}>
                Charges: {item.stoneCharges || 'N/A'}
              </Text>
            )} */}
          </View>
          <View style={styles.cartControls}>
            <QuantityControl
              productId={item._id}
              showSlider={false}
              max={item.stock}
              onlyOne
              size="xsm"
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.medium,
    borderBottomColor: theme.colors.border.main,
    borderBottomWidth: 0.5,
  },
  mediaContainer: {
    width: squareSize,
    marginRight: theme.spacing.medium,
    position: 'relative', // Needed for absolute positioning of flags
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    ...theme.typography.h4,
    marginBottom: theme.spacing.xsmall,
    color: theme.colors.text.primary,
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
  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.small,
    justifyContent: 'space-between',
  },
});

export default ProductItem;
