// screens/ProductListingScreen.js

import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
  Text,
} from 'react-native';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {getAllProductsRequest} from '../../store/actions/productActions';
import theme from '../../theme';
import ProductItem from './components/ProductItem';
import SkeletonProductItem from './components/ProductItemSkeleton'; // Import the Skeleton component
import SearchInput from '../../components/common/SearchInput';
import withScreenshotProtection from '../../HOC/withScreenshotProtection';
import useSearchAndFilter from '../../hooks/useSearchAndFilter';
import {getCategoryOptionsRequest} from '../../store/actions/categoryActions';

const caretOptions = [
  // Define your caret options here if needed
];

const convertToCategoryOptions = categories => {
  return categories.map(category => ({
    label: category.name,
    value: category._id,
  }));
};

const ProductListingScreen = ({route}) => {
  const dispatch = useDispatch();
  const {category} = route.params;

  // Memoize defaultParams to ensure stable reference
  const defaultParams = useMemo(
    () => ({
      parentCategory: category.id || category._id,
    }),
    [category.id, category._id],
  );

  // Initialize the useSearchAndFilter hook
  const {
    filters,
    handleSearch,
    handleFilterChange,
    handleClear,
    fetchProducts,
  } = useSearchAndFilter(getAllProductsRequest, defaultParams);

  // Selectors with shallowEqual to prevent unnecessary re-renders
  const {products, loading, error} = useSelector(
    state => ({
      products: state.product.products,
      loading: state.product.loading,
      error: state.product.error,
    }),
    shallowEqual,
  );

  const {categoryOptions} = useSelector(
    state => ({
      categoryOptions: state.category.categoryOptions,
    }),
    shallowEqual,
  );

  const [refreshing, setRefreshing] = useState(false);

  // Refresh logic for pulling down to refresh products
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchProducts();
    } catch (err) {
      // Handle error if needed
      console.error('Refresh failed:', err);
    } finally {
      setRefreshing(false);
    }
  }, [fetchProducts]);

  // Fetch category options once on mount
  useEffect(() => {
    dispatch(
      getCategoryOptionsRequest({parentId: category.id || category._id}),
    );
  }, [dispatch, category.id, category._id]);

  // Fetch products once on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Memoize renderProduct to prevent re-creating the function on every render
  const renderProduct = useCallback(
    ({item}) => <ProductItem item={item} />,
    [],
  );

  // Memoize renderSkeleton to prevent re-creating the function on every render
  const renderSkeleton = useCallback(() => <SkeletonProductItem />, []);

  // Memoize keyExtractor to prevent re-creating the function on every render
  const keyExtractor = useCallback(item => item._id, []);

  // Memoize category options conversion
  const memoizedCategoryOptions = useMemo(
    () => convertToCategoryOptions(categoryOptions),
    [categoryOptions],
  );

  // Determine the data to render: skeletons or products
  const dataToRender = loading ? Array.from({length: 5}) : products;

  return (
    <View style={styles.container}>
      {/* Search and filter functionality */}
      <SearchInput
        variant="outlined"
        onSearch={handleSearch}
        onApply={handleFilterChange}
        onClear={handleClear}
        placeholder="Type to search..."
        value={filters.searchQuery}
        selectedCategories={filters.selectedCategories} // Pass selected categories to pre-populate the filter
        selectedCarats={filters.selectedCarats} // Pass selected carats (purity)
        minWeight={filters.minWeight} // Pass minWeight to pre-populate
        maxWeight={filters.maxWeight} // Pass maxWeight to pre-populate
        categoryOptions={memoizedCategoryOptions}
        caretOptions={caretOptions}
      />

      {/* Display loading spinner as an overlay instead of blocking the content */}
      {/* {loading && !refreshing && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        </View>
      )} */}

      {/* List of products or skeletons */}
      <FlatList
        data={dataToRender}
        keyExtractor={(item, index) =>
          loading ? `skeleton-${index}` : item._id
        }
        renderItem={loading ? renderSkeleton : renderProduct}
        contentContainerStyle={styles.listContentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary.main]}
          />
        }
        ListEmptyComponent={
          !loading &&
          !error && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No products found.</Text>
            </View>
          )
        }
      />

      {/* Display error message if any */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.default,
    paddingHorizontal: theme.spacing.medium,
    paddingTop: 0,
    flex: 1,
  },

  loadingOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.large,
  },
  emptyText: {
    ...theme.typography.h4,
    color: theme.colors.text.secondary,
  },
  errorContainer: {
    position: 'absolute',
    bottom: theme.spacing.medium,
    left: theme.spacing.medium,
    right: theme.spacing.medium,
    padding: theme.spacing.small,
    backgroundColor: theme.colors.status.errorLight,
    borderRadius: theme.spacing.small,
  },
  errorText: {
    ...theme.typography.body2,
    color: theme.colors.status.errorDark,
    textAlign: 'center',
  },
  listContentContainer: {
    paddingVertical: theme.spacing.medium,
  },
});

export default withScreenshotProtection(ProductListingScreen);
