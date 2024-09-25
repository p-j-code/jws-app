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

  const bankDetailsText = `
    Bank Name: Yes Bank Limited
    Account Name: S G Gold
    Account Number: 018984600003448
    Branch: Worli
    IFSC: YESB0000001
    MICR: 40053200211Z
  `;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Contact Information</Text>

      {/* Address */}
      <View style={styles.contactItem}>
        <Text style={styles.label}>Address:</Text>
        <View style={styles.row}>
          <Text style={styles.value}>
            47/51, Soni Bhavan, Opp Kansara Chawl, 1st Floor, Office No.1,
            Kalbadevi, Mumbai-2
          </Text>
          <TouchableOpacity
            onPress={() =>
              handleCopy(
                '47/51, Soni Bhavan, Opp Kansara Chawl, 1st Floor, Office No.1, Kalbadevi, Mumbai-2',
              )
            }>
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
          <TouchableOpacity onPress={() => handlePhonePress('+91 9029949030')}>
            <Text style={styles.value}>+9 9029949030</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCopy('+91 9029949030')}>
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
            onPress={() => handleEmailPress('swarnashahibysggold@gmail.com')}>
            <Text style={styles.value}>swarnashahibysggold@gmail.com</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCopy('swarnashahibysggold@gmail.com')}>
            <Icon
              name="copy-outline"
              size={24}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bank Details */}
      <View style={styles.contactItem}>
        <Text style={styles.label}>S.G. Gold Banking Details:</Text>
        <View style={styles.row}>
          <View>
            <Text style={styles.value}>Bank Name: Yes Bank Limited</Text>
            <Text style={styles.value}>Account Name: S G Gold</Text>
            <Text style={styles.value}>Account Number: 018984600003448</Text>
            <Text style={styles.value}>Branch: Worli</Text>
            <Text style={styles.value}>IFSC: YESB0000001</Text>
            <Text style={styles.value}>MICR: 40053200211Z</Text>
          </View>
          <TouchableOpacity onPress={() => handleCopy(bankDetailsText)}>
            <Icon
              name="copy-outline"
              size={24}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Google Pay */}
      <View style={styles.contactItem}>
        <Text style={styles.label}>Google Pay Number:</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => handlePhonePress('9029949030')}>
            <Text style={styles.value}>9029949030</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCopy('9029949030')}>
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
