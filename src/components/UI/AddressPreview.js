import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../common/Button';
import theme from '../../theme';

const AddressPreview = ({address, onEdit}) => {
  if (!address) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{address.label}</Text>
      <Text style={styles.text}>
        {address.line1}, {address.line2}, {address.city}, {address.state},{' '}
        {address.pinCode}
      </Text>
      <Button title="Edit Address" onPress={onEdit} size="sm" type="outline" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.xsmall,
  },
  label: {
    ...theme.typography.h5,
    marginBottom: theme.spacing.xsmall,
  },
  text: {
    ...theme.typography.body1,
    marginBottom: theme.spacing.xsmall,
  },
});

export default AddressPreview;
