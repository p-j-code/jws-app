import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loginUserRequest} from '../../store/actions/authActions';
import theme from '../../theme';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';
import withAuth from '../../navigation/components/withAuth';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {loading, error} = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setFormData({...formData, [name]: value});
    if (errors[name]) {
      setErrors({...errors, [name]: ''});
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.phoneNumber)
      newErrors.phoneNumber = 'Phone Number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      dispatch(loginUserRequest(formData));
    }
  };

  useEffect(() => {
    if (error) {
      setErrors({general: error.error});
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {loading && (
        <ActivityIndicator size="large" color={theme.colors.primary.main} />
      )}
      {errors.general && (
        <Text style={styles.errorText}>
          {errors.general || 'An error occurred'}
        </Text>
      )}
      <InputField
        style={styles.input}
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChangeText={value => handleInputChange('phoneNumber', value)}
        keyboardType="phone-pad"
        autoCapitalize="none"
        error={errors.phoneNumber}
      />
      <InputField
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={value => handleInputChange('password', value)}
        secureTextEntry
        error={errors.password}
      />

      <Button title="Login" onPress={handleLogin} />
      <View style={styles.linksContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.link}>
          <Text style={styles.linkText}>Don't have an account? Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.link}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background.default,
  },
  title: {
    fontSize: 24,
    marginBottom: theme.spacing.large,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: theme.colors.border.main,
    borderWidth: 1,
    marginBottom: theme.spacing.medium,
    padding: theme.spacing.small,
    borderRadius: theme.shape.borderRadius,
  },
  errorText: {
    color: theme.colors.status.error,
    marginBottom: theme.spacing.small,
  },
  linksContainer: {
    marginTop: theme.spacing.medium,
    alignItems: 'center',
  },
  link: {
    marginVertical: theme.spacing.small,
  },
  linkText: {
    color: theme.colors.primary.main,
  },
});

export default withAuth(LoginScreen);
