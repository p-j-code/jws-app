import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  logoutUser,
  requestAccountDeleteRequest,
} from '../../store/actions/authActions';
import Button from '../../components/common/Button';
import theme from '../../theme';
import AddressPreview from '../../components/UI/AddressPreview';
import {
  ROOT_PROFILE_STACK_NAME,
  UPDATE_PASSWORD_SCREEN,
  EDIT_PROFILE_SCREEN,
} from '../../navigation/routeConfigurations/profileRoutes';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);

  const handleRequestAccountDelete = () => {
    dispatch(requestAccountDeleteRequest());
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user.name}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <Text style={styles.value}>{user.phoneNumber}</Text>
      </View>
      {user.alternativePhoneNumber && (
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Alternative Phone Number</Text>
          <Text style={styles.value}>{user.alternativePhoneNumber}</Text>
        </View>
      )}
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Address:</Text>
        <AddressPreview address={user.address} />
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>GSTIN</Text>
        <Text style={styles.value}>{user.gstin}</Text>
      </View>

      <Button
        title={'Edit Profile'}
        onPress={() =>
          navigation.navigate(ROOT_PROFILE_STACK_NAME, {
            screen: EDIT_PROFILE_SCREEN,
          })
        }
        type="outline"
        size="sm"
        style={styles.button}
      />

      <Button
        title={'Update Password'}
        onPress={() =>
          navigation.navigate(ROOT_PROFILE_STACK_NAME, {
            screen: UPDATE_PASSWORD_SCREEN,
          })
        }
        type="outline"
        size="sm"
        style={styles.button}
      />

      <Button
        title={'Logout'}
        onPress={() => dispatch(logoutUser())}
        type="outline"
        size="sm"
        variant="error"
        style={styles.button}
      />

      <Button
        title="Request Account Delete"
        onPress={handleRequestAccountDelete}
        type="text"
        size="xsm"
        variant="error"
        style={styles.button}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background.default,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  button: {
    color: theme.colors.primary.main,
    textAlign: 'center',
    marginVertical: theme.spacing.small,
  },
  detailContainer: {
    marginBottom: theme.spacing.medium,
  },
  label: {
    ...theme.typography.subtitle1,
    color: theme.colors.text.secondary,
  },
  value: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
  },
});

export default ProfileScreen;
