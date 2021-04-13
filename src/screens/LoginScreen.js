import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import { login, fbLogin, googleLogin } from '../actions/AuthActions';
import { FormButton, FormInput, SocialButton } from '../components';
import { Color } from '../utils/Color';
import { emailRegEx, passwordRegEx } from '../utils/Constants';

const LoginScreen = ({ navigation, login, googleLogin, fbLogin }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLogin = data => {
    setEmail(data.email);
    setPassword(data.password);
    login(data.email, data.password);
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        style={styles.container}>
        <Image
          source={require('../assets/rn-social-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.text}>Connect</Text>
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

        <FormButton buttonTitle="Sign In" onPress={handleSubmit(onLogin)} />

        {/* <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password</Text>
      </TouchableOpacity> */}

        <SocialButton
          buttonTitle="Sign in with Facebook"
          onPress={() => fbLogin()}
          btnType="facebook"
          color={Color.fb}
          backgroundColor={Color.fbBackground}
        />

        <SocialButton
          buttonTitle="Sign in with Google"
          onPress={() => googleLogin()}
          btnType="google"
          color={Color.google}
          backgroundColor={Color.googleBackground}
        />

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.navButtonText}>
            Dont have an account? Create here
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const mapDispatchToProps = {
  login,
  fbLogin,
  googleLogin,
};

export default connect(() => ({}), mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
});
