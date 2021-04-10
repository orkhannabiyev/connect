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

import { login, fbLogin, googleLogin } from '../actions/AuthActions';
import { FormButton, FormInput, SocialButton } from '../components';
import { Color } from '../utils/Color';

const LoginScreen = ({ navigation, login, googleLogin, fbLogin }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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
        <FormInput
          value={email}
          onChangeText={userEmail => setEmail(userEmail)}
          placeholder="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
          value={password}
          onChangeText={userPassword => setPassword(userPassword)}
          placeholder="Password"
          iconType="lock"
          secureTextEntry={true}
        />

        <FormButton
          buttonTitle="Sign In"
          onPress={() => login(email, password)}
        />

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
