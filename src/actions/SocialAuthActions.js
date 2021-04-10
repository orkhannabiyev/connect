import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

export const GOOGLE_LOGIN = 'GOOGLE_LOGIN';
export const googleLogin = () => async dispatch => ({});

export const FB_LOGIN = 'FB_LOGIN';
export const fbLogin = () => async dispatch => ({});
