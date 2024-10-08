import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import theme from '../../theme';
import {getProductByIdRequest} from '../../store/actions/productActions';
import Carousel from '../../components/common/Carousel';
import QuantityControl from '../../components/UI/QuantityControl';
import withScreenshotProtection from '../../HOC/withScreenshotProtection';
import ProductFlags from '../../components/UI/ProductFlags'; // Import the new ProductFlags component

const {width, height} = Dimensions.get('window');

const ProductDetails = ({route}) => {
  const {productId} = route.params;
  const dispatch = useDispatch();
  const product = useSelector(state => state.product.productDetails);
  const loading = useSelector(state => state.product.loading);
  const [quantityControlHeight, setQuantityControlHeight] = useState(0);

  useEffect(() => {
    dispatch(getProductByIdRequest(productId));
  }, [dispatch, productId]);

  if (loading || !product) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary.main} />
      </View>
    );
  }

  const carouselHeight = height * 0.7;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollViewContent,
          {paddingBottom: quantityControlHeight + 10},
        ]}>
        <View style={styles.mediaContainer}>
          {/* Pass the flags array to the ProductFlags component */}
          <ProductFlags flags={product.flags} />

          <Carousel
            data={product.media}
            width={width}
            height={carouselHeight}
          />
        </View>
        <View style={styles.detailsContainer}>
          {product.name && (
            <Text style={styles.productName}>{product.name || 'No Name'}</Text>
          )}
          {product.narration && (
            <Text style={styles.productNarration}>
              {product.narration || 'No Narration'}
            </Text>
          )}
          {product.description && (
            <Text style={styles.productDescription}>
              {product.description || 'No Description'}
            </Text>
          )}
          {/* <Text style={styles.productDetail}>Type: {product.type}</Text> */}
          <Text style={styles.productDetail}>
            Gross Weight: {product.grossWeight}
          </Text>
          <Text style={styles.productDetail}>
            Net Weight: {product.netWeight}
          </Text>
          {/* <Text style={styles.productDetail}>Purity: {product.purity}</Text> */}
          {product.isStone && (
            <>
              <Text style={styles.productDetail}>
                Stone Weight: {product.stoneWeight || 'N/A'}
              </Text>
              {/* <Text style={styles.productDetail}>
                Stone Charges: {product.stoneCharges || 'N/A'}
              </Text> */}
            </>
          )}
          <Text style={styles.productDetail}>
            Categories: {(product.categories || []).map(c => c.name).join(', ')}
          </Text>
          {product.tags && product.tags.filter(tag => !!tag)?.length ? (
            <Text style={styles.productDetail}>
              Tags: {(product.tags || []).join(', ')}
            </Text>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
      <View
        style={styles.floatingButtonContainer}
        onLayout={event => {
          const {height} = event.nativeEvent.layout;
          setQuantityControlHeight(height);
        }}>
        <QuantityControl
          productId={productId}
          max={product.stock}
          showSlider={false}
          onlyOne
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  scrollViewContent: {
    padding: theme.spacing.medium,
  },
  mediaContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
    position: 'relative', // For flag positioning
  },
  detailsContainer: {
    padding: theme.spacing.medium,
    backgroundColor: '#fff',
    borderRadius: theme.shape.borderRadius,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productName: {
    ...theme.typography.h4,
    marginBottom: theme.spacing.small,
  },
  productNarration: {
    ...theme.typography.body2,
    marginBottom: theme.spacing.small,
  },
  productDescription: {
    ...theme.typography.body1,
    marginBottom: theme.spacing.small,
  },
  productDetail: {
    ...theme.typography.body1,
    marginBottom: theme.spacing.xsmall,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    backgroundColor: theme.colors.background.default,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withScreenshotProtection(ProductDetails);
