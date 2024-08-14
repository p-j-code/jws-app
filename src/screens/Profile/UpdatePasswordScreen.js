import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {changePasswordRequest} from '../../store/actions/authActions';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import theme from '../../theme';

const UpdatePasswordScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {loading, error} = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setFormData({...formData, [name]: value});
    if (errors[name]) {
      setErrors({...errors, [name]: ''});
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.currentPassword)
      newErrors.currentPassword = 'Current password is required';
    if (!formData.newPassword)
      newErrors.newPassword = 'New password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdatePassword = () => {
    if (validateForm()) {
      dispatch(changePasswordRequest(formData, () => navigation.goBack()));
    }
  };

  useEffect(() => {
    if (error) {
      setErrors({general: error.message});
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Update Password</Text>
        </View>

        {loading && (
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        )}
        <InputField
          label="Current Password"
          placeholder="Enter your current password"
          value={formData.currentPassword}
          onChangeText={value => handleInputChange('currentPassword', value)}
          error={errors.currentPassword}
          secureTextEntry
        />
        <InputField
          label="New Password"
          placeholder="Enter your new password"
          value={formData.newPassword}
          onChangeText={value => handleInputChange('newPassword', value)}
          error={errors.newPassword}
          secureTextEntry
        />
        {errors.general && (
          <Text style={styles.errorText}>
            {errors.general || 'An error occurred'}
          </Text>
        )}
        <Button
          style={{width: '100%'}}
          title="Update Password"
          onPress={handleUpdatePassword}
        />

        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
          type="text"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
    padding: theme.spacing.large,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerContainer: {
    marginBottom: theme.spacing.large,
    alignItems: 'center',
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  errorText: {
    color: theme.colors.status.error,
    marginVertical: theme.spacing.small,
    textAlign: 'center',
  },
});

export default UpdatePasswordScreen;
