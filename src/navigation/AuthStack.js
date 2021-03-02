import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LoginScreen, OnboardingScreen, SignUpScreen } from '../screens/index';

const AppStack = createStackNavigator();

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

  if (isFirstLaunch === true) {
    routeName = 'Onboarding';
  } else if (isFirstLaunch === false) {
    routeName = 'Login';
  } else {
    return null;
  }

  return (
    <AppStack.Navigator initialRouteName={routeName} headerMode="none">
      <AppStack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={() => null}
      />
      <AppStack.Screen
        name="Login"
        component={LoginScreen}
        options={() => null}
      />
      <AppStack.Screen name="SignUp" component={SignUpScreen} />
    </AppStack.Navigator>
  );
};

export default AuthStack;
