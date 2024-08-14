// src/components/CustomHeader.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../theme';

const SimpleHeader = ({title, showBack = false, onBackPress}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.headerContainer}>
      {showBack && navigation.canGoBack() && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}>
          <Ionicons
            name="arrow-back-outline"
            size={28}
            color={theme.colors.text.light}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: theme.colors.background.subtle,
    paddingTop: theme.spacing.small,
    paddingBottom: theme.spacing.small,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', // Ensure back button is placed correctly
  },
  headerText: {
    color: theme.colors.text.light,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    textAlign: 'center',
    flex: 1, // Center the text and push back button to the left
  },
  backButton: {
    position: 'absolute',
    left: theme.spacing.small, // Adjust spacing as needed
    paddingVertical: theme.spacing.small, // Increase touchable area vertically
    paddingHorizontal: theme.spacing.medium, // Increase touchable area horizontally
    zIndex: 10, // Ensure the button is on top
  },
});

export default SimpleHeader;
