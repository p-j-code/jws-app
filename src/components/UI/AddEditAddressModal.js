import React, {useState, useEffect} from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import InputField from '../common/InputField';
import Button from '../common/Button';
import theme from '../../theme';

const AddEditAddressModal = ({visible, onClose, onSubmit, address, title}) => {
  const [formData, setFormData] = useState({
    label: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pinCode: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (address) {
      setFormData(address);
    }
  }, [address]);

  const handleInputChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!formData.line1) {
      errors.line1 = 'Address Line 1 is required';
      valid = false;
    }
    if (!formData.city) {
      errors.city = 'City is required';
      valid = false;
    }
    if (!formData.state) {
      errors.state = 'State is required';
      valid = false;
    }
    if (!formData.pinCode) {
      errors.pinCode = 'Pin Code is required';
      valid = false;
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
      errors.pinCode = 'Pin Code must be a 6-digit number';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {title ? `${title} Address` : 'Add / Edit Address'}
          </Text>
          <InputField
            label="Label (e.g., Home, Business)"
            value={formData.label}
            onChangeText={value => handleInputChange('label', value)}
          />
          <InputField
            label="Address Line 1"
            value={formData.line1}
            onChangeText={value => handleInputChange('line1', value)}
            error={errors.line1}
          />
          <InputField
            label="Address Line 2"
            value={formData.line2}
            onChangeText={value => handleInputChange('line2', value)}
          />
          <InputField
            label="City"
            value={formData.city}
            onChangeText={value => handleInputChange('city', value)}
            error={errors.city}
          />
          <InputField
            label="State"
            value={formData.state}
            onChangeText={value => handleInputChange('state', value)}
            error={errors.state}
          />
          <InputField
            label="Pin Code"
            value={formData.pinCode}
            onChangeText={value => handleInputChange('pinCode', value)}
            error={errors.pinCode}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              onPress={onClose}
              size="sm"
              variant="secondary"
              type="outline"
            />
            <Button
              title={title ? `${title} Address` : 'Submit'}
              onPress={handleSubmit}
              size="sm"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: theme.spacing.large,
    backgroundColor: 'white',
    borderRadius: theme.spacing.small,
    alignItems: 'center',
  },
  modalTitle: {
    ...theme.typography.h2,
    marginBottom: theme.spacing.medium,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default AddEditAddressModal;
