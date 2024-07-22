import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {LOGIN_SCREEN} from '../../navigation/routeConfigurations/authRoutes';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import {
  requestOtpForPasswordResetRequest,
  resetPasswordWithOtpRequest,
} from '../../store/actions/authActions';
import OtpModal from '../../components/UI/OtpModal';

const ForgotPasswordScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const dispatch = useDispatch();
  const {error: requestError} = useSelector(state => state.auth);

  const validatePhoneNumber = phoneNumber => {
    const phoneRegex = /^[0-9]{10}$/; // Adjust this regex according to your requirements
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid phone number.');
      return;
    }
    if (!newPassword) {
      setError('Please enter a new password.');
      return;
    }
    setError('');
    dispatch(requestOtpForPasswordResetRequest(phoneNumber));
    setOtpModalVisible(true);
  };

  const handleOtpSubmit = otp => {
    const resetData = {phoneNumber, otp, newPassword};
    dispatch(resetPasswordWithOtpRequest(resetData));
    setOtpModalVisible(false);
    navigation.navigate(LOGIN_SCREEN);
  };

  useEffect(() => {
    setError('');
  }, [phoneNumber, newPassword]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <InputField
        label="Phone Number"
        placeholder="Enter Your Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        error={error}
      />
      <InputField
        label="New Password"
        placeholder="Enter Your New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        error={error}
      />
      {requestError ? <Text style={styles.error}>{requestError}</Text> : null}
      <Button title="Send OTP" onPress={handleSubmit} />
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate(LOGIN_SCREEN)}
        style={styles.backButton}
        type="text"
      />
      <OtpModal
        visible={otpModalVisible}
        onClose={() => setOtpModalVisible(false)}
        onSubmit={handleOtpSubmit}
        phoneNumber={phoneNumber}
      />
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
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 10,
  },
});

export default ForgotPasswordScreen;
