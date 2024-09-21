import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../theme'; // Assuming the theme file is in the same directory

const ContactScreen = () => {
  const handleCopy = text => {
    Clipboard.setString(text);
    Alert.alert('Copied to clipboard!', text);
  };

  const handleEmailPress = email => {
    Linking.openURL(`mailto:${email}`);
  };

  const handlePhonePress = phoneNumber => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleTermsPress = () => {
    Linking.openURL('https://sggold.co.in/public/privacy-policy');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Contact Information</Text>

      {/* Address */}
      <View style={styles.contactItem}>
        <Text style={styles.label}>Address:</Text>
        <View style={styles.row}>
          <Text style={styles.value}>1234 Green Street, Mumbai, India</Text>
          <TouchableOpacity
            onPress={() => handleCopy('1234 Green Street, Mumbai, India')}>
            <Icon
              name="copy-outline"
              size={24}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Phone Number */}
      <View style={styles.contactItem}>
        <Text style={styles.label}>Phone Number:</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => handlePhonePress('+91 9004252561')}>
            <Text style={styles.value}>+91 9004252561</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCopy('+91 9004252561')}>
            <Icon
              name="copy-outline"
              size={24}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Email */}
      <View style={styles.contactItem}>
        <Text style={styles.label}>Email:</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => handleEmailPress('example@example.com')}>
            <Text style={styles.value}>example@example.com</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCopy('example@example.com')}>
            <Icon
              name="copy-outline"
              size={24}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bank Account */}
      <View style={styles.contactItem}>
        <Text style={styles.label}>Bank Account:</Text>
        <View style={styles.row}>
          <Text style={styles.value}>
            Account No: 1234567890, IFSC: ABCD0123456
          </Text>
          <TouchableOpacity
            onPress={() =>
              handleCopy('Account No: 1234567890, IFSC: ABCD0123456')
            }>
            <Icon
              name="copy-outline"
              size={24}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Policy and Terms */}
      <View style={styles.policyContainer}>
        <TouchableOpacity onPress={handleTermsPress}>
          <Text style={styles.policyText}>Policy and Terms</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background.default,
  },
  heading: {
    ...theme.typography.h2,
    marginBottom: theme.spacing.large,
  },
  contactItem: {
    marginBottom: theme.spacing.medium,
    padding: theme.spacing.small,
    backgroundColor: theme.colors.background.inputField,
    borderRadius: theme.shape.borderRadius,
  },
  label: {
    ...theme.typography.subtitle1,
    color: theme.colors.text.secondary,
  },
  value: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    textDecorationLine: 'underline',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  policyContainer: {
    marginTop: theme.spacing.large,
    alignItems: 'center',
  },
  policyText: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    textDecorationLine: 'underline',
  },
});

export default ContactScreen;
