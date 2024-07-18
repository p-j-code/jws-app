import React from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import Button from './Button';
import theme from '../../theme';

const CustomModal = ({
  visible,
  onClose,
  onSubmit,
  title,
  message,
  children,
  submitTitle = 'Submit',
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{message}</Text>
          {children}
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
            />
            <Button title={submitTitle} onPress={onSubmit} size="sm" />
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
    width: '80%',
    padding: theme.spacing.large,
    backgroundColor: 'white',
    borderRadius: theme.spacing.small,
    alignItems: 'center',
  },
  modalTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.medium,
  },
  modalText: {
    ...theme.typography.body1,
    marginBottom: theme.spacing.large,
  },
});

export default CustomModal;
