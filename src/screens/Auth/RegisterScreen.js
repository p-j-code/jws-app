import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {registerUserRequest} from '../../store/actions/authActions';
import {updateForm, clearForm} from '../../store/actions/formActions';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import AddEditAddressModal from '../../components/UI/AddEditAddressModal';
import AddressPreview from '../../components/UI/AddressPreview';
import theme from '../../theme';
import Title from '../../components/common/Title';
import {useNavigation} from '@react-navigation/native';
import {LOGIN_SCREEN} from '../../navigation/routeConfigurations/authRoutes';
import withAuth from '../../navigation/components/withAuth';

const mock = {
  address: {
    label: 'Home',
    line1: '123',
    line2: '123',
    city: '123',
    pinCode: '123123',
    state: '123',
  },
  alternativePhoneNumber: '',
  email: 'p7@gmail.com',
  gstin: '22AAAAA0000A7Z1',
  name: 'Prem',
  password: '123456789',
  phoneNumber: '6231231247',
};

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loading, error} = useSelector(state => state.auth);
  const formData = useSelector(state => state.form.registerForm || {});

  const [errors, setErrors] = useState({});
  const [showAddressModal, setShowAddressModal] = useState(false);

  // useEffect(() => {
  //   dispatch(updateForm('registerForm', mock));
  // }, []);

  const handleInputChange = (name, value) => {
    dispatch(updateForm('registerForm', {[name]: value}));
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
      dispatch(registerUserRequest(formData));
    }
  };

  const handleAddressSubmit = address => {
    dispatch(updateForm('registerForm', {address}));
    setShowAddressModal(false);
  };

  useEffect(() => {
    if (error) {
      setErrors({general: error.error});
    }
  }, [error]);

  // useEffect(() => {
  //   // Cleanup the form when the component unmounts
  //   return () => {
  //     dispatch(clearForm('registerForm'));
  //   };
  // }, [dispatch]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Title>Register</Title>
        <Button
          title="Login?"
          onPress={() => navigation.navigate(LOGIN_SCREEN)}
          size="sm"
          type="text"
        />
      </View>

      {loading && (
        <ActivityIndicator size="large" color={theme.colors.primary.main} />
      )}
      <InputField
        label="Email"
        value={formData.email || ''}
        onChangeText={value => handleInputChange('email', value)}
        error={errors.email}
        placeholder="Enter your email"
      />
      <InputField
        label="Name"
        value={formData.name || ''}
        onChangeText={value => handleInputChange('name', value)}
        error={errors.name}
        placeholder="Enter your name"
      />
      <InputField
        label="Phone Number"
        value={formData.phoneNumber || ''}
        onChangeText={value => handleInputChange('phoneNumber', value)}
        error={errors.phoneNumber}
        placeholder="Enter your phone number"
      />
      <InputField
        label="Alternative Phone Number"
        value={formData.alternativePhoneNumber || ''}
        onChangeText={value =>
          handleInputChange('alternativePhoneNumber', value)
        }
        placeholder="Enter alternative phone number (optional)"
      />
      <InputField
        label="GSTIN"
        value={formData.gstin || ''}
        onChangeText={value => handleInputChange('gstin', value)}
        error={errors.gstin}
        placeholder="Enter your GSTIN"
      />
      <InputField
        label="Password"
        value={formData.password || ''}
        onChangeText={value => handleInputChange('password', value)}
        secureTextEntry
        error={errors.password}
        placeholder="Enter your password"
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
      {errors.general && (
        <Text style={styles.errorText}>
          {errors.general || 'An error occurred'}
        </Text>
      )}
      <Button title="Register" onPress={handleRegister} />

      <TouchableOpacity onPress={() => navigation.navigate(LOGIN_SCREEN)}>
        <Text style={styles.loginTextBottom}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>

      <AddEditAddressModal
        visible={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSubmit={handleAddressSubmit}
        address={formData.address}
        title={formData.address ? 'Edit' : 'Add'}
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
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
    marginVertical: theme.spacing.small,
    textAlign: 'center',
  },
  loginText: {
    color: theme.colors.primary.main,
    textAlign: 'right',
  },
  loginTextBottom: {
    marginTop: theme.spacing.medium,
    color: theme.colors.primary.main,
    textAlign: 'center',
  },
});

export default withAuth(RegisterScreen);
