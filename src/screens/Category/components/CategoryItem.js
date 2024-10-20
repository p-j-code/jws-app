import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../../theme';
import {
  PRODUCT_DETAILS_SCREEN,
  PRODUCT_LISTING_SCREEN,
  ROOT_PRODUCT_STACK_NAME,
} from '../../../navigation/routeConfigurations/productRoutes';
import withScreenshotProtection from '../../../HOC/withScreenshotProtection';
import ProductFlags from '../../../components/UI/ProductFlags';
import SkeletonProductGroup from './SkeletonProductGroup'; // Import the skeleton component

const {width} = Dimensions.get('window');

// Constant to control title trimming
const TRIM_CATEGORY_TITLE = false;

const ProductGroup = ({
  parentCategories,
  products,
  clearSearch,
  loading = false,
}) => {
  const navigation = useNavigation();

  const categoryPath = parentCategories
    .map(category => category.name)
    .join(' > ');

  const handleCategoryPress = category => {
    clearSearch && clearSearch();
    navigation.navigate(ROOT_PRODUCT_STACK_NAME, {
      screen: PRODUCT_LISTING_SCREEN,
      params: {category: category[category.length - 1]},
    });
  };

  const handleProductPress = product => {
    clearSearch && clearSearch();
    navigation.navigate(ROOT_PRODUCT_STACK_NAME, {
      screen: PRODUCT_DETAILS_SCREEN,
      params: {productId: product._id},
    });
  };

  // If loading, render the skeleton
  if (loading) {
    return <SkeletonProductGroup />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => handleCategoryPress(parentCategories)}
          style={styles.categoryPathContainer}>
          <Text
            style={styles.clickableHeader}
            numberOfLines={TRIM_CATEGORY_TITLE ? 1 : null}
            ellipsizeMode={TRIM_CATEGORY_TITLE ? 'tail' : 'clip'}>
            {categoryPath}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategoryPress(parentCategories)}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={[...products]}
        keyExtractor={item => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleProductPress(item)}>
            <View style={styles.productCard}>
              <ProductFlags flags={item.flags} />
              <Image
                source={{uri: item.media[0].url}}
                style={styles.productImage}
              />
              <LinearGradient
                colors={theme.colors.gradient.overlay}
                style={styles.gradientOverlay}
                start={{x: 0, y: 1}}
                end={{x: 0, y: 0}}
              />
              <View style={styles.productDetails}>
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
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.medium,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
  },
  categoryPathContainer: {
    flex: 1,
    marginRight: theme.spacing.small,
  },
  clickableHeader: {
    ...theme.typography.h4,
    color: theme.colors.primary.main,
    textDecorationLine: 'underline',
    textDecorationColor: theme.colors.primary.main,
  },
  seeAllText: {
    ...theme.typography.body1,
    color: theme.colors.primary.main,
  },
  productCard: {
    width: width * 0.35,
    marginRight: theme.spacing.small,
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: width * 0.4,
  },
  gradientOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
  },
  productDetails: {
    position: 'absolute',
    bottom: 0,
    padding: theme.spacing.small,
  },
  productDetail: {
    ...theme.typography.caption,
    color: theme.colors.background.default,
  },
});

export default withScreenshotProtection(ProductGroup);
