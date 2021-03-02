import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import { FormButton, FormInput, SocialButton } from '../components/index';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/rn-social-logo.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>RN Social App</Text>
      <FormInput
        labelValue={email}
        onChangeText={() => setEmail(email)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        labelValue={password}
        onChangeText={() => setPassword(password)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton buttonTitle="Sign In" onPress={() => alert('lolo')} />

      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password</Text>
      </TouchableOpacity>

      <SocialButton
        buttonTitle="Sign in with Facebook"
        onPress={() => alert('facebook')}
        btnType="facebook"
        color="#1152df"
        backgroundColor="#aaaaaa"
      />

      <SocialButton
        buttonTitle="Sign in with Google"
        onPress={() => alert('google')}
        btnType="google"
        color="#f90606"
        backgroundColor="#a8a8a8"
      />

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.navButtonText}>
          Dont have an account? Create here
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
