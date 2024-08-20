import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import theme from '../../theme';

const RadioButton = ({label, value, selected, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress(value)} style={styles.container}>
      <View style={styles.radioCircle}>
        {selected && <View style={styles.innerCircle} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.small,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.small,
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary.main,
  },
  label: {
    ...theme.typography.body1,
  },
});

export default RadioButton;
