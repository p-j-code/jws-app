import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import InputField from './InputField';
import FilterModal from '../UI/FilterModal';
import {debounce} from 'lodash';
import Button from './Button';
import theme from '../../theme';

const SearchInput = ({
  label,
  onSearch,
  onFilterChange, // New prop to handle filter changes
  variant = 'filled',
  placeholder,
  categoryOptions,
  caretOptions,
  value,
}) => {
  const [query, setQuery] = useState(value);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const debouncedSearch = useCallback(
    debounce(query => {
      onSearch(query);
    }, 300),
    [onSearch],
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <InputField
          label={label}
          value={query}
          onChangeText={setQuery}
          variant={variant}
          placeholder={placeholder}
          style={styles.inputField}
        />
      </View>
      <Button
        title="Filter"
        onPress={() => setFilterModalVisible(true)}
        variant="primary"
        type="outline"
        style={styles.filterButton}
      />
      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={onFilterChange} // Pass the handler to apply filters
        categoryOptions={categoryOptions}
        caretOptions={caretOptions}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  inputWrapper: {
    flex: 1,
    marginRight: theme.spacing.small,
    marginTop: theme.spacing.medium,
  },
  inputField: {
    width: '100%', // Ensures the input field takes up the full width of its container
  },
  filterButton: {
    width: 100, // Set a fixed width for the button to ensure it doesn't shrink or grow
    paddingVertical: theme.spacing.small, // Adjust the padding as needed
  },
});

export default SearchInput;
