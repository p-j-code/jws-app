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

const ForgetPasswordOTPScreen = ({route, navigation}) => {
  const {phoneNumber} = route.params;
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const {error: resetError} = useSelector(state => state.auth);

  const handleResetPassword = () => {
    if (!otp || !newPassword) {
      setError('OTP and new password are required.');
      return;
    }
    setError('');
    const resetData = {phoneNumber, otp, newPassword};
    dispatch(resetPasswordWithOtpRequest(resetData));
    // Navigate to login screen or show a success message
    navigation.navigate(LOGIN_SCREEN); // Assuming you want to navigate back to login after reset
  };

  useEffect(() => {
    setError('');
  }, [otp, newPassword]);

  useEffect(() => {
    dispatch(requestOtpForPasswordResetRequest(phoneNumber));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <InputField
        label="OTP"
        placeholder="Enter the OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
        error={error}
      />
      <InputField
        label="New Password"
        placeholder="Enter your new password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        error={error}
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
});

export default ForgetPasswordOTPScreen;
