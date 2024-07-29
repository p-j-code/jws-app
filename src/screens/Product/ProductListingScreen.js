import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProductsRequest} from '../../store/actions/productActions';
import theme from '../../theme';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';

const {width, height} = Dimensions.get('window');

const ProductListingScreen = ({route}) => {
  const {category} = route.params;
  const dispatch = useDispatch();
  const {products} = useSelector(state => state.product); // Adjust based on your Redux state structure

  useEffect(() => {
    dispatch(
      getAllProductsRequest({
        category: category.id || category._id,
      }),
    );
  }, [category, dispatch]);

  const renderMedia = media => {
    return media.map(item => {
      if (item.type === 'image') {
        return (
          <Image key={item._id} source={{uri: item.url}} style={styles.media} />
        );
      } else if (item.type === 'video') {
        return (
          <Video
            key={item._id}
            source={{uri: item.url}}
            style={styles.media}
            resizeMode="cover"
            shouldPlay
            isLooping
          />
        );
      }
      return null;
    });
  };

  const renderProduct = ({item}) => (
    <View style={styles.productContainer}>
      <View style={styles.mediaContainer}>{renderMedia(item.media)}</View>
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{item.name || 'No Name'}</Text>
        <Text style={styles.productNarration}>
          {item.narration || 'No Narration'}
        </Text>
        <Text style={styles.productDetail}>
          Gross Weight: {item.grossWeight || 'N/A'}
        </Text>
        <Text style={styles.productDetail}>
          Net Weight: {item.netWeight || 'N/A'}
        </Text>
        {item.isStone && (
          <>
            <Text style={styles.productDetail}>
              Stone Weight: {item.stoneWeight || 'N/A'}
            </Text>
            <Text style={styles.productDetail}>
              Stone Charges: {item.stoneCharges || 'N/A'}
            </Text>
          </>
        )}
        <View style={styles.cartControls}>
          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartButtonText}>Remove from Cart</Text>
          </TouchableOpacity>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={item.stock || 1}
              step={1}
              value={1}
            />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={products}
      keyExtractor={item => item._id}
      renderItem={renderProduct}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.medium,
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.large,
  },
  mediaContainer: {
    flex: 1,
    marginRight: theme.spacing.medium,
  },
  media: {
    width: width * 0.4,
    height: height * 0.3,
    marginBottom: theme.spacing.small,
  },
  detailsContainer: {
    flex: 2,
    justifyContent: 'space-between',
  },
  productName: {
    ...theme.typography.h4,
    marginBottom: theme.spacing.small,
  },
  productNarration: {
    ...theme.typography.body2,
    marginBottom: theme.spacing.small,
  },
  productDetail: {
    ...theme.typography.body1,
    marginBottom: theme.spacing.small,
  },
  cartControls: {
    marginTop: theme.spacing.medium,
  },
  cartButton: {
    backgroundColor: theme.colors.primary.main,
    padding: theme.spacing.small,
    borderRadius: theme.shape.borderRadius,
    alignItems: 'center',
    marginBottom: theme.spacing.small,
  },
  cartButtonText: {
    color: '#fff',
    ...theme.typography.body1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityLabel: {
    ...theme.typography.body1,
  },
  slider: {
    flex: 1,
    marginLeft: theme.spacing.small,
  },
});

export default ProductListingScreen;
