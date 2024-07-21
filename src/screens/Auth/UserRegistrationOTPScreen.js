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

const UserRegistrationOTPScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {phoneNumber, error: apiError} = useSelector(state => state.auth.user);
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
    dispatch(verifyOtpRequest({phoneNumber: newPhoneNumber, otp}));
  };

  const handleResendOtp = () => {
    dispatch(resendOtpRequest(newPhoneNumber));
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
        style={styles.input}
        placeholder="OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
      />

      {apiError && (
        <Text style={styles.errorText}>{apiError || 'An error occurred'}</Text>
      )}
      <Button title="Verify OTP" onPress={handleOtpSubmit} />
      <Button title="Resend OTP" type="text" onPress={handleResendOtp} />

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handlePhoneNumberUpdate}
        title="Update Phone Number">
        <InputField
          style={styles.input}
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
});

export default UserRegistrationOTPScreen;
