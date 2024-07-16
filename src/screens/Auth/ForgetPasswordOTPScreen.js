import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const ForgetPasswordOTPScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="OTP"
        keyboardType="numeric"
      />
      <Button title="Verify OTP" onPress={() => {}} />
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

export default ForgetPasswordOTPScreen;
