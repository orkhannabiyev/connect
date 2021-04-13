import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import { FormButton, FormInput } from '../components';
import { register } from '../actions/AuthActions';
import { totalSize } from '../utils/Dimentions';
import { emailRegEx, passwordRegEx } from '../utils/Constants';

const SignUpScreen = ({ navigation, register }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignin = data => {
    setEmail(data.email);
    setPassword(data.password);
    setConfirmPassword(data.confirmPassword);
    register(data.email, data.password);
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        style={styles.container}>
        <Text style={styles.text}>Create an account</Text>

        <Controller
          name="email"
          control={control}
          render={({ field: { onChange } }) => (
            <FormInput
              value={email}
              error={errors.email}
              onChangeText={userEmail => onChange(userEmail)}
              placeholder="Email"
              iconType="user"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          )}
          rules={{
            required: { value: true, message: 'Type Email, bitch' },
            pattern: {
              value: emailRegEx,
              message: 'Type correct email, BITCH',
            },
          }}
          defaultValue=""
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange } }) => (
            <FormInput
              value={password}
              error={errors.password}
              onChangeText={userPassword => onChange(userPassword)}
              placeholder="Password"
              iconType="lock"
              secureTextEntry={true}
            />
          )}
          rules={{
            required: { value: true, message: 'Type password, bitch' },
            pattern: {
              value: passwordRegEx,
              message: 'Type correct password, BITCH',
            },
          }}
          defaultValue=""
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field: { onChange } }) => (
            <FormInput
              value={confirmPassword}
              error={errors.confirmPassword}
              onChangeText={userPassword => onChange(userPassword)}
              placeholder="Confirm Password"
              iconType="lock"
              secureTextEntry={true}
            />
          )}
          rules={{
            required: { value: true, message: 'Type password, bitch' },
            pattern: {
              value: passwordRegEx,
              message: 'Confirm password, BITCH',
            },
          }}
          defaultValue=""
        />

        <FormButton buttonTitle="Sign Up" onPress={handleSubmit(onSignin)} />

        <View style={styles.textPrivate}>
          <Text style={styles.color_textPrivate}>
            By registering, you confirm that you accept our{' '}
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
              Terms of service
            </Text>
          </TouchableOpacity>
          <Text style={styles.color_textPrivate}> and </Text>
          <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
            Privacy Policy
          </Text>
        </View>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.navButtonText}>Have an account? Sign In</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const mapDispatchToProps = {
  register,
};

export default connect(() => ({}), mapDispatchToProps)(SignUpScreen);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: totalSize(2),
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginVertical: totalSize(5),
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: totalSize(5),

    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});
