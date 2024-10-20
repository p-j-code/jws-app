import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ProductGroup from './components/CategoryItem'; // This is your product group component
import SearchInput from '../../components/common/SearchInput';
import theme from '../../theme';
import CategoryCardList from './components/CategoryCardList';
import withScreenshotProtection from '../../HOC/withScreenshotProtection';
import useSearchAndFilter from '../../hooks/useSearchAndFilter';
import {getProductsGroupedByCategoriesRequest} from '../../store/actions/productActions';
import {
  getAllCategoriesRequest,
  getCategoryOptionsRequest,
} from '../../store/actions/categoryActions';

const caretOptions = [
  // {label: '14KT', value: 14},
  // {label: '18KT', value: 18},
  // {label: '20KT', value: 20},
  // {label: '21KT', value: 21},
  // {label: '22KT', value: 22},
  // {label: '23KT', value: 23},
  // {label: '24KT', value: 24},
];

const convertToCategoryOptions = categories => {
  return categories.map(category => ({
    label: category.name,
    value: category._id,
  }));
};

const CategoryList = () => {
  const dispatch = useDispatch();

  // Memoize defaultParams to ensure stable reference
  const defaultParams = useMemo(
    () => ({
      groupByParentCategories: true,
    }),
    [],
  );

  const {
    filters,
    handleSearch,
    handleFilterChange,
    handleClear,
    fetchProducts,
  } = useSearchAndFilter(getProductsGroupedByCategoriesRequest, defaultParams);

  const {
    groupedProducts: products,
    loading: productsLoading,
    error: productsError,
  } = useSelector(state => state.product);

  const {
    categories = [],
    loading: categoriesLoading,
    error: categoriesError,
    categoryOptions,
  } = useSelector(state => state.category);

  const [refreshing, setRefreshing] = useState(false);

  // Handle pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCategoryOptions();
    fetchProducts();
    setRefreshing(false);
  }, [fetchProducts]);

  // Fetch category options based on search query
  const fetchCategoryOptions = useCallback(() => {
    dispatch(
      getCategoryOptionsRequest({onlyParents: true, name: filters.searchQuery}),
    );
  }, [dispatch, filters.searchQuery]);

  // Fetch category options and reset filters when the screen comes into focus
  useEffect(() => {
    fetchCategoryOptions(); // Fetch category options
    dispatch(
      getAllCategoriesRequest({onlyParents: true, name: filters.searchQuery}),
    );
  }, [dispatch, filters.searchQuery, fetchCategoryOptions, handleClear]);

  // Trigger fetchProducts when any filter changes
  useEffect(() => {
    fetchProducts(); // Trigger fetch when filters change
  }, [filters]); // Add filters as a dependency

  // Sample skeleton data for loading state
  const skeletonProducts = {
    parentCategory: ['Loading Category'],
    products: [{name: 'Loading Product...', id: 'loading'}],
  };

  return (
    <View style={styles.container}>
      <SearchInput
        variant="outlined"
        onSearch={handleSearch}
        onApply={handleFilterChange}
        onClear={handleClear}
        placeholder="Type to search..."
        value={filters.searchQuery}
        categoryOptions={convertToCategoryOptions(categoryOptions)}
        caretOptions={caretOptions}
      />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary.main]}
          />
        }>
        {productsError || categoriesError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              Error: {productsError || categoriesError}
            </Text>
          </View>
        ) : (
          <>
            <CategoryCardList
              loading={categoriesLoading}
              categories={categories}
              clearSearch={handleClear}
            />
            {(productsLoading ? [skeletonProducts] : Object.keys(products)).map(
              (key, idx) => (
                <ProductGroup
                  loading={productsLoading}
                  key={`${key}-${idx}`}
                  parentCategories={
                    productsLoading
                      ? skeletonProducts.parentCategory
                      : products[key].parentCategory || []
                  }
                  products={
                    productsLoading
                      ? skeletonProducts.products
                      : products[key].products || []
                  }
                  clearSearch={handleClear}
                />
              ),
            )}
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
    paddingTop: 0,
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
