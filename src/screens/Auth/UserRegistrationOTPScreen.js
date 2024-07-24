import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateProfileRequest,
  verifyOtpRequest,
  resendOtpRequest,
} from '../../store/actions/authActions';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import CustomModal from '../../components/common/CustomModal';
import theme from '../../theme';
import withAuth from '../../navigation/components/withAuth';
import {STATUS_ERROR_CODES} from '../../utils/constants';

const UserRegistrationOTPScreen = ({checkAuth}) => {
  const dispatch = useDispatch();
  const {user, error: apiError} = useSelector(state => state.auth);
  const phoneNumber = user?.phoneNumber;
  const [otp, setOtp] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
  const [modalPhoneNumber, setModalPhoneNumber] = useState(phoneNumber);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');

  const isValidPhoneNumber = phoneNumber => {
    const phoneRegex = /^[0-9]{10}$/; // Adjust this regex according to your requirements
    return phoneRegex.test(phoneNumber);
  };

  const handlePhoneNumberUpdate = () => {
    if (isValidPhoneNumber(modalPhoneNumber)) {
      setNewPhoneNumber(modalPhoneNumber);
      dispatch(updateProfileRequest({phoneNumber: modalPhoneNumber}));
      setModalVisible(false);
      setError('');
    } else {
      setError('Please enter a valid phone number.');
    }
  };

  const handleOtpSubmit = () => {
    dispatch(
      verifyOtpRequest({phoneNumber: newPhoneNumber, otp}, async () => {
        await checkAuth();
      }),
    );
  };

  const handleResendOtp = () => {
    dispatch(resendOtpRequest(newPhoneNumber));
  };

  const getAPIError = () => {
    if (typeof apiError === 'string') {
      const isHandledError =
        Object.values(STATUS_ERROR_CODES).includes(apiError);
      return isHandledError ? null : apiError;
    }

    return apiError?.message || apiError?.error;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <View style={styles.phoneNumberContainer}>
        <Text>Phone Number: {newPhoneNumber}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <InputField
        placeholder="OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
      />

      {getAPIError() && (
        <Text style={styles.errorText}>
          {getAPIError() || 'An error occurred'}
        </Text>
      )}
      <Button title="Verify OTP" onPress={handleOtpSubmit} />
      <Button title="Resend OTP" type="text" onPress={handleResendOtp} />

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handlePhoneNumberUpdate}
        title="Update Phone Number">
        <InputField
          placeholder="New Phone Number"
          value={modalPhoneNumber}
          onChangeText={setModalPhoneNumber}
          error={error}
        />
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    fontSize: theme.typography.body1.fontSize,
  },
  editText: {
    color: theme.colors.primary,
    textDecorationLine: 'underline',
    marginLeft: 5,
    fontSize: theme.typography.body1.fontSize,
  },
  errorText: {
    color: theme.colors.status.error,
    marginVertical: theme.spacing.small,
    textAlign: 'center',
  },
});

export default withAuth(UserRegistrationOTPScreen);
