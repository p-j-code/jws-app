import React, {useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import SearchInput from '../common/SearchInput';
import theme from '../../theme';

const caretOptions = [
  {label: '14KT', value: 14},
  {label: '18KT', value: 18},
  {label: '20KT', value: 20},
  {label: '21KT', value: 21},
  {label: '22KT', value: 22},
  {label: '23KT', value: 23},
  {label: '24KT', value: 24},
];

const SearchFilter = ({
  onSearch,
  onApply,
  onClear,
  categoryOptions,
  defaultFilters = {},
}) => {
  const [searchQuery, setSearchQuery] = useState(
    defaultFilters.searchQuery || '',
  );
  const [selectedCategories, setSelectedCategories] = useState(
    defaultFilters.categories || [],
  );
  const [selectedCarats, setSelectedCarats] = useState(
    defaultFilters.carats || [],
  );
  const [minWeight, setMinWeight] = useState(defaultFilters.minWeight || '');
  const [maxWeight, setMaxWeight] = useState(defaultFilters.maxWeight || '');

  const handleSearch = useCallback(
    query => {
      setSearchQuery(query);
      onSearch(query); // Pass search query to parent
    },
    [onSearch],
  );

  const handleFilterChange = useCallback(() => {
    console.log()
    // Pass filter values to parent on apply
    onApply(selectedCategories, selectedCarats, minWeight, maxWeight);
  }, [onApply, selectedCategories, selectedCarats, minWeight, maxWeight]);

  const handleClear = useCallback(() => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedCarats([]);
    setMinWeight('');
    setMaxWeight('');
    onClear(); // Notify parent to clear filters
  }, [onClear]);

  return (
    <View style={styles.container}>
      <SearchInput
        variant="outlined"
        onSearch={handleSearch}
        onApply={handleFilterChange} // Pass filters when "Apply" is clicked
        onClear={handleClear} // Clear all filters
        placeholder="Type to search..."
        value={searchQuery}
        categoryOptions={categoryOptions}
        caretOptions={caretOptions}
        selectedCategories={selectedCategories}
        selectedCarats={selectedCarats}
        minWeight={minWeight}
        maxWeight={maxWeight}
        onCategoryChange={setSelectedCategories}
        onCaratChange={setSelectedCarats}
        onMinWeightChange={setMinWeight}
        onMaxWeightChange={setMaxWeight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.medium,
  },
});

export default SearchFilter;
