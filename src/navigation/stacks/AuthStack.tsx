import React, { useEffect } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { LoginScreen, OnboardingScreen, SignUpScreen } from '@screens/index';
import { AuthStackParams } from 'navigation/types/authStackTypes';

const Stack = createStackNavigator<AuthStackParams>();

export enum AUTH_ROUTES {
  ONBOARDING = 'Onboarding',
  LOGIN = 'Login',
  SIGN_UP = 'SignUp',
}

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(Boolean);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
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
        name={AUTH_ROUTES.ONBOARDING}
        component={OnboardingScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name={AUTH_ROUTES.LOGIN}
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name={AUTH_ROUTES.SIGN_UP}
        component={SignUpScreen}
        options={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
            shadowColor: '#f9fafd',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <FontAwesome.Button
                name="long-arrow-left"
                size={25}
                backgroundColor="#f9fafd"
                color="#333"
                onPress={() => navigation.navigate('Login')}
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
