import React from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import theme from '../../../theme';

const ProductGroup = ({parentCategories, products}) => {
  const categoryPath = parentCategories
    .map(category => category.name)
    .join(' > ');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{categoryPath}</Text>
      <FlatList
        data={products}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View style={styles.productCard}>
            <Image
              source={{uri: item.media[0].url}}
              style={styles.productImage}
            />
            {item.name && <Text style={styles.productName}>{item.name}</Text>}
            {item.narration && (
              <Text style={styles.productNarration}>{item.narration}</Text>
            )}
            <Text style={styles.productDetail}>
              Gross Weight: {item.grossWeight}
            </Text>
            <Text style={styles.productDetail}>
              Net Weight: {item.netWeight}
            </Text>
            {item.isStone && (
              <>
                <Text style={styles.productDetail}>
                  Stone Weight: {item.stoneWeight}
                </Text>
                <Text style={styles.productDetail}>
                  Stone Charges: {item.stoneCharges}
                </Text>
              </>
            )}
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
    backgroundColor: theme.colors.background.subtle,
    padding: theme.spacing.medium,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing.small,
    borderColor: theme.colors.border.main,
    borderWidth: 1,
  },
  productImage: {
    width: '100%',
    height: 200,
    marginBottom: theme.spacing.small,
  },
  productName: {
    ...theme.typography.body1,
    marginBottom: theme.spacing.small,
  },
  productNarration: {
    ...theme.typography.body2,
    marginBottom: theme.spacing.small,
  },
  productDetail: {
    ...theme.typography.body2,
    marginBottom: theme.spacing.xsmall,
  },
});

export default ProductGroup;
