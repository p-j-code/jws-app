import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../../theme';

const {width} = Dimensions.get('window');

const ProductGroup = ({parentCategories, products}) => {
  const categoryPath = parentCategories
    .map(category => category.name)
    .join(' > ');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{categoryPath}</Text>
      <FlatList
        data={[...products, ...products, ...products]}
        keyExtractor={item => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
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
              {/* {item.name && <Text style={styles.productName}>{item.name}</Text>}
              {item.narration && (
                <Text style={styles.productNarration}>{item.narration}</Text>
              )} */}
              <Text style={styles.productDetail}>
                Gross Weight: {item.grossWeight}
              </Text>
              <Text style={styles.productDetail}>
                Net Weight: {item.netWeight}
              </Text>
              {/* {item.isStone && (
                <>
                  <Text style={styles.productDetail}>
                    Stone Weight: {item.stoneWeight}
                  </Text>
                  <Text style={styles.productDetail}>
                    Stone Charges: {item.stoneCharges}
                  </Text>
                </>
              )} */}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.large,
  },
  header: {
    ...theme.typography.h3,
    color: theme.colors.primary.main,
    marginBottom: theme.spacing.medium,
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
    color: theme.colors.text.secondary,
  },
});

export default ProductGroup;
