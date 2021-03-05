import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { LoginScreen, OnboardingScreen, SignUpScreen } from '../screens/index';

const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  GoogleSignin.configure({
    webClientId:
      '386848489272-0g843mfmkg84lsa3vshjgo28n8oc1fjm.apps.googleusercontent.com',
  });

  if (isFirstLaunch === true) {
    routeName = 'Onboarding';
  } else if (isFirstLaunch === false) {
    routeName = 'Login';
  } else {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={routeName} headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={() => null}
      />
      <Stack.Screen name="Login" component={LoginScreen} options={() => null} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
