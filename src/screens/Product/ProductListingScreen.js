import React, {useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProductsRequest} from '../../store/actions/productActions';
import theme from '../../theme';
import ProductItem from './components/ProductItem';
import withScreenshotProtection from '../../HOC/withScreenshotProtection.js';

const ProductListingScreen = ({route}) => {
  const {category} = route.params;
  const dispatch = useDispatch();
  const {products, loading} = useSelector(state => state.product);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = useCallback(() => {
    dispatch(getAllProductsRequest({category: category.id || category._id}));
  }, [dispatch, category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
    setRefreshing(false);
  }, [fetchProducts]);

  const renderProduct = ({item}) => <ProductItem item={item} />;

  if (loading && !refreshing) {
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
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.colors.primary.main]} // Use theme color for the spinner
        />
      }
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
