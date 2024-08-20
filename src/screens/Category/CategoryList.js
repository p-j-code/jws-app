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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCarats, setSelectedCarats] = useState([]);
  const [minWeight, setMinWeight] = useState('');
  const [maxWeight, setMaxWeight] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const handleSearch = useCallback(query => {
    setSearchQuery(query);
  }, []);

  const handleFilterChange = useCallback((categories, carats, minWt, maxWt) => {
    setSelectedCategories(categories);
    setSelectedCarats(carats);
    setMinWeight(minWt);
    setMaxWeight(maxWt);
  }, []);

  const fetchProducts = useCallback(() => {
    dispatch(
      getProductsGroupedByCategoriesRequest({
        groupByParentCategories: true,
        search: searchQuery,
        categories: selectedCategories,
        carats: selectedCarats,
        minWeight: minWeight ? parseFloat(minWeight) : undefined,
        maxWeight: maxWeight ? parseFloat(maxWeight) : undefined,
      }),
    );

    dispatch(getAllCategoriesRequest({name: searchQuery}));
  }, [
    dispatch,
    searchQuery,
    selectedCategories,
    selectedCarats,
    minWeight,
    maxWeight,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
    setRefreshing(false);
  }, [fetchProducts]);

  const categoryOptions = [
    {label: 'Rings', value: 'rings'},
    {label: 'Necklaces', value: 'necklaces'},
    {label: 'Bracelets', value: 'bracelets'},
  ];

  const caretOptions = [
    {label: '14KT', value: '14KT'},
    {label: '18KT', value: '18KT'},
    {label: '20KT', value: '20KT'},
    {label: '21KT', value: '21KT'},
    {label: '22KT', value: '22KT'},
    {label: '23KT', value: '23KT'},
    {label: '24KT', value: '24KT'},
  ];

  return (
    <View style={styles.container}>
      <SearchInput
        variant="outlined"
        onSearch={handleSearch}
        onFilterChange={handleFilterChange} // Pass the filter change handler
        placeholder="Type to search..."
        value={searchQuery}
        categoryOptions={categoryOptions}
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
