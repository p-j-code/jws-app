import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import theme from '../../theme';

const Dropdown = ({label, options, selectedValue, onValueChange}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = value => {
    onValueChange(value);
    setIsVisible(false);
  };

  const getLabel = () => {
    return options?.find(opt => opt.value === selectedValue) || {};
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={styles.dropdownTrigger}
        onPress={() => setIsVisible(true)}>
        <Text style={styles.selectedValue}>
          {selectedValue ? getLabel().label : 'Select an option'}
        </Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isVisible}
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <FlatList
            data={options}
            keyExtractor={item => item.value}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item.value)}>
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.medium,
  },
  label: {
    ...theme.typography.body2,
    marginBottom: theme.spacing.xsmall,
  },
  dropdownTrigger: {
    borderWidth: 1,
    borderColor: theme.colors.border.main,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background.inputField,
  },
  selectedValue: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: theme.colors.background.default,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing.medium,
  },
  option: {
    paddingVertical: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  optionText: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
  },
});

export default Dropdown;
