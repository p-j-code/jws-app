import {useReducer, useMemo, useCallback} from 'react';
import {useDispatch} from 'react-redux';

const initialState = {
  searchQuery: '',
  selectedCategories: [],
  selectedCarats: [],
  minWeight: '',
  maxWeight: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return {...state, searchQuery: action.payload};
    case 'SET_FILTERS':
      return {
        ...state,
        selectedCategories: action.payload.categories,
        selectedCarats: action.payload.carats,
        minWeight: action.payload.minWt,
        maxWeight: action.payload.maxWt,
      };
    case 'CLEAR_FILTERS':
      return initialState;
    default:
      return state;
  }
}

const useSearchAndFilter = (fetchProductsAction, defaultParams = {}) => {
  const dispatchRedux = useDispatch();
  const [state, dispatch] = useReducer(reducer, initialState);

  // Memoize the filters object
  const filters = useMemo(() => ({...state}), [state]);

  const handleSearch = useCallback(query => {
    dispatch({type: 'SET_SEARCH_QUERY', payload: query});
  }, []);

  const handleFilterChange = useCallback((categories, carats, minWt, maxWt) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {categories, carats, minWt, maxWt},
    });
  }, []);

  const handleClear = useCallback(() => {
    dispatch({type: 'CLEAR_FILTERS'});
  }, []);

  const fetchProducts = useCallback(() => {
    dispatchRedux(
      fetchProductsAction({
        ...defaultParams,
        search: filters.searchQuery,
        parentCategory:
          filters.selectedCategories.length > 0
            ? filters.selectedCategories
            : defaultParams.parentCategory,
        purity: filters.selectedCarats,
        minWeight: filters.minWeight
          ? parseFloat(filters.minWeight)
          : undefined,
        maxWeight: filters.maxWeight
          ? parseFloat(filters.maxWeight)
          : undefined,
      }),
    );
  }, [dispatchRedux, fetchProductsAction, defaultParams, filters]);

  return {
    filters,
    handleSearch,
    handleFilterChange,
    handleClear,
    fetchProducts,
  };
};

export default useSearchAndFilter;
