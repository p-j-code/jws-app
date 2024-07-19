import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getUserRequest,
  registerUserRequest,
  verifyOtpRequest,
} from '../../store/actions/authActions';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import OtpModal from '../../components/UI/OtpModal';
import CustomModal from '../../components/common/CustomModal';
import AddEditAddressModal from '../../components/UI/AddEditAddressModal';
import AddressPreview from '../../components/UI/AddressPreview';
import theme from '../../theme';
import Title from '../../components/common/Title';

const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {loading, user, error} = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phoneNumber: '',
    alternativePhoneNumber: '',
    address: null,
    gstin: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  useEffect(() => {
    dispatch(getUserRequest());
  }, []);
  
  useEffect(() => {
    if (user) {
      setFormData(user);
      setShowConfirmModal(true);
    }
  }, [user]);

  const handleInputChange = (name, value) => {
    setFormData({...formData, [name]: value});
    if (errors[name]) {
      setErrors({...errors, [name]: ''});
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.phoneNumber)
      newErrors.phoneNumber = 'Phone Number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.gstin) newErrors.gstin = 'GSTIN is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      setShowConfirmModal(true);
    }
  };

  const handleOtpSubmit = otp => {
    dispatch(verifyOtpRequest({phoneNumber: formData.phoneNumber, otp}));
    setShowOtpModal(false);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmModal(false);
    dispatch(registerUserRequest(formData));
  };

  const handleAddressSubmit = address => {
    setFormData({...formData, address});
    setShowAddressModal(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title>Register</Title>
      {loading && (
        <ActivityIndicator size="large" color={theme.colors.primary.main} />
      )}
      <InputField
        label="Email"
        value={formData.email}
        onChangeText={value => handleInputChange('email', value)}
        error={errors.email}
      />
      <InputField
        label="Name"
        value={formData.name}
        onChangeText={value => handleInputChange('name', value)}
        error={errors.name}
      />
      <InputField
        label="Phone Number"
        value={formData.phoneNumber}
        onChangeText={value => handleInputChange('phoneNumber', value)}
        error={errors.phoneNumber}
      />
      <InputField
        label="Alternative Phone Number"
        value={formData.alternativePhoneNumber}
        onChangeText={value =>
          handleInputChange('alternativePhoneNumber', value)
        }
      />

      <InputField
        label="GSTIN"
        value={formData.gstin}
        onChangeText={value => handleInputChange('gstin', value)}
        error={errors.gstin}
      />
      <InputField
        label="Password"
        value={formData.password}
        onChangeText={value => handleInputChange('password', value)}
        secureTextEntry
        error={errors.password}
      />
      <View style={styles.addressContainer}>
        <Text style={styles.addressLabel}>Address</Text>
        <AddressPreview
          address={formData.address}
          onEdit={() => setShowAddressModal(true)}
        />
        {!formData.address && (
          <Button
            title="Add Address"
            onPress={() => setShowAddressModal(true)}
            size="sm"
            type="outline"
          />
        )}
        {errors.address && (
          <Text style={styles.errorText}>{errors.address}</Text>
        )}
      </View>
      <Button title="Register" onPress={handleRegister} />

      <OtpModal
        visible={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onSubmit={handleOtpSubmit}
        phoneNumber={formData.phoneNumber}
      />

      <CustomModal
        visible={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onSubmit={handleConfirmSubmit}
        submitTitle="Send OTP"
        title="Confirm Phone Number"
        message={`Please confirm your phone number: ${formData.phoneNumber}`}
      />

      <AddEditAddressModal
        visible={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSubmit={handleAddressSubmit}
        address={formData.address}
        title={formData.address ? "Edit" : "Add"}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background.default,
  },
  addressContainer: {
    marginBottom: theme.spacing.medium,
  },
  addressLabel: {
    ...theme.typography.subtitle2,
    marginBottom: theme.spacing.small,
  },
  errorText: {
    color: theme.colors.status.error,
    marginTop: theme.spacing.xsmall,
  },
});

export default RegisterScreen;
