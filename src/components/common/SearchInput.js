import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import InputField from './InputField';
import {debounce} from 'lodash';
import theme from '../../theme';

const SearchInput = ({
  label,
  onSearch,
  variant = 'filled',
  placeholder,
  value,
}) => {
  const [query, setQuery] = useState(value);

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
      <InputField
        label={label}
        value={query}
        onChangeText={setQuery}
        variant={variant}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default SearchInput;
