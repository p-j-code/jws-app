import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProductsRequest} from '../../store/actions/productActions';
import ProductGroup from './components/CategoryItem';
import SearchInput from '../../components/common/SearchInput';
import theme from '../../theme';

const CategoryList = () => {
  const dispatch = useDispatch();
  const {products, loading, error} = useSelector(state => state.product);
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(searchQuery => {
    setQuery(searchQuery);
  }, []);

  useEffect(() => {
    dispatch(getAllProductsRequest({groupByParentCategories: true, query}));
  }, [dispatch, query]);

  return (
    <View style={styles.container}>
      <SearchInput
        variant="outlined"
        onSearch={handleSearch}
        placeholder="Type to search..."
        value={query}
      />
      <ScrollView>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error: {error}</Text>
          </View>
        ) : (
          Object.keys(products).map((key, idx) => (
            <ProductGroup
              key={key + idx}
              parentCategories={products[key].parentCategories}
              products={products[key].products}
            />
          ))
        )}
      </ScrollView>
    </View>
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
