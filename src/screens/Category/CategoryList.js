import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getProductsGroupedByCategoriesRequest} from '../../store/actions/productActions';
import {getAllCategoriesRequest} from '../../store/actions/categoryActions';
import ProductGroup from './components/CategoryItem';
import SearchInput from '../../components/common/SearchInput';
import theme from '../../theme';
import CategoryCardList from './components/CategoryCardList';
import withScreenshotProtection from '../../HOC/withScreenshotProtection';

const CategoryList = () => {
  const dispatch = useDispatch();
  const {
    groupedProducts: products,
    loading,
    error,
  } = useSelector(state => state.product);
  const {
    categories = [],
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector(state => state.category);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const handleSearch = useCallback(query => {
    setSearchQuery(query);
  }, []);

  const fetchProducts = useCallback(() => {
    dispatch(
      getProductsGroupedByCategoriesRequest({
        groupByParentCategories: true,
        search: searchQuery,
      }),
    );

    dispatch(getAllCategoriesRequest({name: searchQuery}));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
    setRefreshing(false);
  }, [fetchProducts]);

  return (
    <View style={styles.container}>
      <SearchInput
        variant="outlined"
        onSearch={handleSearch}
        placeholder="Type to search..."
        value={searchQuery}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary.main]}
          />
        }>
        {loading || categoriesLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : error || categoriesError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              Error: {error || categoriesError}
            </Text>
          </View>
        ) : (
          <>
            <CategoryCardList categories={categories} />
            {Object.keys(products).map((key, idx) => (
              <ProductGroup
                key={key + idx}
                parentCategories={products[key].parentCategories}
                products={products[key].products}
              />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.medium,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...theme.typography.h4,
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

export default withScreenshotProtection(CategoryList);
