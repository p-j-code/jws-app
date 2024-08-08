import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProductsRequest} from '../../store/actions/productActions';
import theme from '../../theme';
import ProductItem from './components/ProductItem';
import withScreenshotProtection from '../../HOC/withScreenshotProtection.js';

const ProductListingScreen = ({route}) => {
  const {category} = route.params;
  const dispatch = useDispatch();
  const {products, loading} = useSelector(state => state.product);
  const lastCategory = category[category.length - 1];

  useEffect(() => {
    dispatch(
      getAllProductsRequest({category: lastCategory.id || lastCategory._id}),
    );
  }, [category, dispatch]);

  const renderProduct = ({item}) => <ProductItem item={item} />;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary.main} />
      </View>
    );
  }

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
    backgroundColor: theme.colors.background.default,
    padding: theme.spacing.medium,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.default,
  },
});

export default withScreenshotProtection(ProductListingScreen);
