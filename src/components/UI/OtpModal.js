import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import InputField from '../common/InputField';
import Button from '../common/Button';
import theme from '../../theme';

const OtpModal = ({visible, onClose, onSubmit, phoneNumber}) => {
  const [otp, setOtp] = useState('');

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Verify Phone Number</Text>
          <Text style={styles.modalText}>
            An OTP has been sent to {phoneNumber}
          </Text>
          <InputField label="OTP" value={otp} onChangeText={setOtp} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Button
              title="Cancel"
              onPress={onClose}
              size="sm"
              variant="secondary"
              type="outline"
            />
            <Button
              title="Submit OTP"
              onPress={() => onSubmit(otp)}
              size="sm"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: theme.spacing.large,
    backgroundColor: 'white',
    borderRadius: theme.spacing.small,
    alignItems: 'center',
  },
  modalTitle: {
    ...theme.typography.h2,
    marginBottom: theme.spacing.medium,
  },
  modalText: {
    ...theme.typography.body1,
    marginBottom: theme.spacing.large,
  },
});

export default OtpModal;
