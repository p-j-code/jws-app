import React, {useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getAllProductsRequest} from '../../store/actions/productActions';
import theme from '../../theme';
import ProductItem from './components/ProductItem';
import SearchInput from '../../components/common/SearchInput';
import withScreenshotProtection from '../../HOC/withScreenshotProtection';
import useSearchAndFilter from '../../hooks/useSearchAndFilter'; // Import the hook

const caretOptions = [
  {label: '14KT', value: 14},
  {label: '18KT', value: 18},
  {label: '20KT', value: 20},
  {label: '21KT', value: 21},
  {label: '22KT', value: 22},
  {label: '23KT', value: 23},
  {label: '24KT', value: 24},
];

const ProductListingScreen = ({route}) => {
  const {category} = route.params;
  const {products, loading} = useSelector(state => state.product);

  // Hook for managing search and filter functionality
  const {
    filters, // Single object for filters (searchQuery, selectedCategories, etc.)
    handleSearch,
    handleFilterChange,
    handleClear,
    fetchProducts,
  } = useSearchAndFilter(getAllProductsRequest, {
    parentCategory: category.id || category._id,
  });

  const [refreshing, setRefreshing] = useState(false);

  // Refresh logic for pulling down to refresh products
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
    setRefreshing(false);
  }, [fetchProducts]);

  // Trigger fetchProducts whenever filters change
  useEffect(() => {
    fetchProducts(); // Fetch products when filters change
  }, [filters]); // Add filters and fetchProducts as dependencies

  // Render each product
  const renderProduct = ({item}) => <ProductItem item={item} />;

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
        caretOptions={caretOptions}
      />
      {/* Display loading spinner as an overlay instead of blocking the content */}
      {loading && !refreshing && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        </View>
      )}

      {/* List of products */}
      <FlatList
        data={products}
        keyExtractor={item => item._id}
        renderItem={renderProduct}
        // contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary.main]} // Use theme color for the spinner
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.default,
    padding: theme.spacing.medium,
    paddingTop: 0,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Slightly transparent overlay
    zIndex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.default,
  },
});

export default withScreenshotProtection(ProductListingScreen);
