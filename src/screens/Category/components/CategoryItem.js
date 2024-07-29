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

const {width} = Dimensions.get('window');

// Constant to control title trimming
const TRIM_CATEGORY_TITLE = false;

const ProductGroup = ({parentCategories, products}) => {
  const navigation = useNavigation();

  const categoryPath = parentCategories
    .map(category => category.name)
    .join(' > ');

  const handleCategoryPress = category => {
    navigation.navigate(ROOT_PRODUCT_STACK_NAME, {
      screen: PRODUCT_LISTING_SCREEN,
      params: {category},
    });
  };

  const handleProductPress = product => {
    navigation.navigate(ROOT_PRODUCT_STACK_NAME, {
      screen: PRODUCT_DETAILS_SCREEN,
      params: {product},
    });
  };

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
                  Gross Weight: {item.grossWeight}
                </Text>
                <Text style={styles.productDetail}>
                  Net Weight: {item.netWeight}
                </Text>
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
    // borderBottomWidth: 1,
    // borderBottomColor: theme.colors.secondary.main,
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
    width: width * 0.4,
    marginRight: theme.spacing.small,
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 100,
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
  productName: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
  },
  productNarration: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  productDetail: {
    ...theme.typography.caption,
    color: theme.colors.background.default,
  },
});

export default ProductGroup;
