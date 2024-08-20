import React, {useState, useEffect} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Button from '../common/Button';
import InputField from '../common/InputField';
import Dropdown from '../common/Dropdown';
import RadioButton from '../common/RadioButton'; // Import the custom RadioButton component
import theme from '../../theme';

const FilterModal = ({
  isVisible,
  onClose,
  onApply, // Add onApply prop to handle filter application
  categoryOptions,
  caretOptions,
  initialSelectedCategory,
  initialSelectedCaret,
  initialMinWeight, // Add initialMinWeight
  initialMaxWeight, // Add initialMaxWeight
}) => {
  const [minWeight, setMinWeight] = useState(initialMinWeight || '');
  const [maxWeight, setMaxWeight] = useState(initialMaxWeight || '');
  const [selectedCategory, setSelectedCategory] = useState(
    initialSelectedCategory || '',
  );
  const [selectedCaret, setSelectedCaret] = useState(
    initialSelectedCaret || null,
  );

  useEffect(() => {
    // Update state when initial values change
    setSelectedCategory(initialSelectedCategory || '');
    setSelectedCaret(initialSelectedCaret || null);
    setMinWeight(initialMinWeight || '');
    setMaxWeight(initialMaxWeight || '');
  }, [
    initialSelectedCategory,
    initialSelectedCaret,
    initialMinWeight,
    initialMaxWeight,
  ]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              <View style={styles.inputContainer}>
                <InputField
                  label="Min Weight"
                  placeholder="Min wt."
                  value={minWeight}
                  onChangeText={setMinWeight}
                  style={[styles.inputField, {marginRight: 10}]}
                  inputContainerStyle={styles.inputContainerStyle}
                />
                <InputField
                  label="Max Weight"
                  placeholder="Max wt."
                  value={maxWeight}
                  onChangeText={setMaxWeight}
                  style={styles.inputField}
                  inputContainerStyle={styles.inputContainerStyle}
                />
              </View>
              {categoryOptions && (
                <Dropdown
                  label="Select Category"
                  options={categoryOptions}
                  selectedValue={selectedCategory}
                  onValueChange={value => setSelectedCategory(value)}
                />
              )}

              {caretOptions && (
                <View style={styles.radioGroup}>
                  {caretOptions.map((option, index) => (
                    <View
                      key={option.value}
                      style={[
                        styles.radioItem,
                        index % 2 === 0 && {marginRight: theme.spacing.small},
                      ]}>
                      <RadioButton
                        label={option.label}
                        value={option.value}
                        selected={selectedCaret === option.value}
                        onPress={setSelectedCaret}
                      />
                    </View>
                  ))}
                </View>
              )}

              <View style={styles.buttonContainer}>
                <Button
                  title="Clear Filter"
                  onPress={() => {
                    setMinWeight('');
                    setMaxWeight('');
                    setSelectedCategory('');
                    setSelectedCaret(null);
                  }}
                  variant="secondary"
                  type="text"
                  style={[styles.button]}
                />
                <Button
                  title="Set Filter"
                  onPress={() => {
                    onApply(
                      selectedCategory,
                      selectedCaret,
                      minWeight,
                      maxWeight,
                    ); // Pass selected values back to parent
                    onClose(); // Close the modal
                  }}
                  variant="primary"
                  style={[styles.button]}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%', // Make sure modal content takes full width
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Make sure input container takes full width
  },
  inputField: {},
  inputContainerStyle: {
    width: '50%',
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  radioItem: {
    width: '48%', // Take up half the width of the container
    marginBottom: theme.spacing.small,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: '48%',
  },
});

export default FilterModal;
