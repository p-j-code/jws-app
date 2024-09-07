import {useMemo, useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';

const useSearchAndFilter = (
  fetchProductsAction,
  defaultParams = {},
  fetchCategoryOptionsAction = null,
) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCarats, setSelectedCarats] = useState([]);
  const [minWeight, setMinWeight] = useState('');
  const [maxWeight, setMaxWeight] = useState('');

  // Memoize the filters object to prevent unnecessary re-renders
  const filters = useMemo(() => {
    return {
      searchQuery,
      selectedCategories,
      selectedCarats,
      minWeight,
      maxWeight,
    };
  }, [searchQuery, selectedCategories, selectedCarats, minWeight, maxWeight]);

  const handleSearch = useCallback(query => {
    setSearchQuery(query);
  }, []);

  const handleFilterChange = useCallback((categories, carats, minWt, maxWt) => {
    setSelectedCategories(categories);
    setSelectedCarats(carats);
    setMinWeight(minWt);
    setMaxWeight(maxWt);
  }, []);

  const handleClear = useCallback(() => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedCarats([]);
    setMinWeight('');
    setMaxWeight('');
  }, []);

  const fetchProducts = useCallback(() => {
    dispatch(
      fetchProductsAction({
        ...defaultParams,
        search: filters.searchQuery,
        categories: filters.selectedCategories,
        purity: filters.selectedCarats,
        minWeight: filters.minWeight
          ? parseFloat(filters.minWeight)
          : undefined,
        maxWeight: filters.maxWeight
          ? parseFloat(filters.maxWeight)
          : undefined,
      }),
    );
  }, [dispatch, filters, defaultParams, fetchProductsAction]);

  const fetchCategoryOptions = useCallback(() => {
    if (fetchCategoryOptionsAction) {
      dispatch(fetchCategoryOptionsAction());
    }
  }, [dispatch, fetchCategoryOptionsAction]);

  return {
    filters,
    handleSearch,
    handleFilterChange,
    handleClear,
    fetchProducts,
    fetchCategoryOptions,
  };
};

export default useSearchAndFilter;
