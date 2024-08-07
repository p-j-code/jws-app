// src/screens/EditProfileScreen.js
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateProfileRequest,
  getUserRequest,
} from '../../store/actions/authActions';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import AddEditAddressModal from '../../components/UI/AddEditAddressModal';
import AddressPreview from '../../components/UI/AddressPreview';
import theme from '../../theme';
import Title from '../../components/common/Title';
import {useNavigation} from '@react-navigation/native';
import {
  PROFILE_SCREEN,
  ROOT_PROFILE_STACK_NAME,
} from '../../navigation/routeConfigurations/profileRoutes';

const EditProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {user, loading, error} = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phoneNumber: '',
    alternativePhoneNumber: '',
    address: null,
    gstin: '',
  });
  const [errors, setErrors] = useState({});
  const [showAddressModal, setShowAddressModal] = useState(false);

  useEffect(() => {
    dispatch(getUserRequest());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        name: user.name || '',
        phoneNumber: user.phoneNumber || '',
        alternativePhoneNumber: user.alternativePhoneNumber || '',
        address: user.address || null,
        gstin: user.gstin || '',
      });
    }
  }, [user]);

  const handleInputChange = (name, value) => {
    setFormData({...formData, [name]: value});
    if (errors[name]) {
      setErrors({...errors, [name]: ''});
    }
  };

  const navigateToProfile = () => {
    // navigation.navigate(ROOT_PROFILE_STACK_NAME, {screen: PROFILE_SCREEN});
    navigation.goBack();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProfile = () => {
    if (validateForm()) {
      dispatch(updateProfileRequest(formData, navigateToProfile));
    }
  };

  const handleAddressSubmit = address => {
    setFormData({...formData, address});
    setShowAddressModal(false);
  };

  useEffect(() => {
    if (error) {
      setErrors({general: error.error});
    }
  }, [error]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Title>Edit Profile</Title>
      </View>

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
        editable={false}
        disabled
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
        editable={false}
        disabled
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
      <Button title="Update Profile" onPress={handleUpdateProfile} />

      <Button
        title="Back to Profile"
        onPress={navigateToProfile}
        type="text"
        size="sm"
        style={{marginTop: theme.spacing.small}}
      />

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
});

export default EditProfileScreen;
