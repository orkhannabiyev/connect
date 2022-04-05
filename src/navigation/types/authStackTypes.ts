import { AUTH_ROUTES } from '@navigation/stacks/AuthStack';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

export type AuthStackParams = {
  [AUTH_ROUTES.ONBOARDING]: undefined;
  [AUTH_ROUTES.LOGIN]: undefined;
  [AUTH_ROUTES.SIGN_UP]: undefined;
};

export type AppScreenRouteProp = RouteProp<
  AuthStackParams,
  AUTH_ROUTES.ONBOARDING
>;
export type AppScreenNavigationProp = StackNavigationProp<
  AuthStackParams,
  AUTH_ROUTES.ONBOARDING
>;
