import { NavigationProp } from '@react-navigation/core';
import { AUTH_ROUTES } from 'navigation/stacks/AuthStack';
import { AuthStackParams } from 'navigation/types/authStackTypes';
import React, { FC } from 'react';
import { Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

type OnboardingScreenType = {
  navigation: NavigationProp<AuthStackParams>;
};

const OnboardingScreen: FC<OnboardingScreenType> = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() => navigation.navigate(AUTH_ROUTES.LOGIN)}
      onDone={() => navigation.navigate(AUTH_ROUTES.LOGIN)}
      pages={[
        {
          backgroundColor: '#0df2c9',
          image: (
            <Image
              source={require('../assets/onboarding/onboarding-img1.png')}
            />
          ),
          title: 'Onboarding 1',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#de8787',
          image: (
            <Image
              source={require('../assets/onboarding/onboarding-img2.png')}
            />
          ),
          title: 'Onboarding 2',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#b6ee68',
          image: (
            <Image
              source={require('../assets/onboarding/onboarding-img3.png')}
            />
          ),
          title: 'Onboarding 3',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
      ]}
    />
  );
};

export default OnboardingScreen;
