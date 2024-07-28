import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProductsRequest} from '../../store/actions/productActions';
import ProductGroup from './components/CategoryItem';
import theme from '../../theme';

const CategoryList = () => {
  const dispatch = useDispatch();
  const {products, loading, error} = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getAllProductsRequest({groupByParentCategories: true}));
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {Object.keys(products).map(key => (
        <ProductGroup
          key={key}
          parentCategories={products[key].parentCategories}
          products={products[key].products}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
    padding: theme.spacing.medium,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...theme.typography.h2,
    color: theme.colors.status.error,
  },
});

export default CategoryList;
