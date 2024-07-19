import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateProfileRequest,
  verifyOtpRequest,
} from '../../store/actions/authActions';

const UserRegistrationOTPScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {phoneNumber, canUpdateProfile} = useSelector(state => state.auth.user);
  const [otp, setOtp] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
  const [editPhoneNumber, setEditPhoneNumber] = useState(false);

  const handlePhoneNumberUpdate = () => {
    dispatch(updateProfileRequest({phoneNumber: newPhoneNumber}));
    setEditPhoneNumber(false);
  };

  const handleOtpSubmit = () => {
    dispatch(verifyOtpRequest({phoneNumber: newPhoneNumber, otp}));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      {editPhoneNumber ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="New Phone Number"
            value={newPhoneNumber}
            onChangeText={setNewPhoneNumber}
          />
          <Button
            title="Update Phone Number"
            onPress={handlePhoneNumberUpdate}
          />
        </>
      ) : (
        <>
          <Text>Phone Number: {newPhoneNumber}</Text>
          {canUpdateProfile && (
            <Button
              title="Edit Phone Number"
              onPress={() => setEditPhoneNumber(true)}
            />
          )}
        </>
      )}
      <TextInput
        style={styles.input}
        placeholder="OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
      />
      <Button title="Verify OTP" onPress={handleOtpSubmit} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
});

export default UserRegistrationOTPScreen;
