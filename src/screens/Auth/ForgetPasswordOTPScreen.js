import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import {
  requestOtpForPasswordResetRequest,
  resetPasswordWithOtpRequest,
} from '../../store/actions/authActions';
import {LOGIN_SCREEN} from '../../navigation/routeConfigurations/authRoutes';
import Title from '../../components/common/Title';

const ForgetPasswordOTPScreen = ({route, navigation}) => {
  const {phoneNumber} = route.params;
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otpError, setOtpError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const {error: resetError} = useSelector(state => state.auth);

  const handleResetPassword = () => {
    let valid = true;

    if (!otp) {
      setOtpError('OTP is required.');
      valid = false;
    } else {
      setOtpError('');
    }

    if (!newPassword) {
      setPasswordError('New password is required.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      const resetData = {phoneNumber, otp, newPassword};
      dispatch(resetPasswordWithOtpRequest(resetData));
      // Navigate to login screen or show a success message
      navigation.navigate(LOGIN_SCREEN); // Assuming you want to navigate back to login after reset
    }
  };

  useEffect(() => {
    setOtpError('');
  }, [otp]);

  useEffect(() => {
    setPasswordError('');
  }, [newPassword]);

  useEffect(() => {
    dispatch(requestOtpForPasswordResetRequest(phoneNumber));
  }, []);

  return (
    <View style={styles.container}>
      <Title position="center">Reset Password</Title>
      <InputField
        label="OTP"
        placeholder="Enter the OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
        error={otpError}
      />
      <InputField
        label="New Password"
        placeholder="Enter your new password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        error={passwordError}
      />
      {resetError ? <Text style={styles.error}>{resetError}</Text> : null}
      <Button title="Reset Password" onPress={handleResetPassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default ForgetPasswordOTPScreen;
