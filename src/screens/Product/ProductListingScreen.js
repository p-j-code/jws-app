import React, {useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProductsRequest} from '../../store/actions/productActions';
import theme from '../../theme';
import ProductItem from './components/ProductItem';
import withScreenshotProtection from '../../HOC/withScreenshotProtection.js';

const ProductListingScreen = ({route}) => {
  const {category} = route.params;
  const dispatch = useDispatch();
  const {products} = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getAllProductsRequest({category: category.id || category._id}));
  }, [category, dispatch]);

  const renderProduct = ({item}) => <ProductItem item={item} />;

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
});

export default withScreenshotProtection(ProductListingScreen);
