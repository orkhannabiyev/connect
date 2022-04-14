import {
  AUTH_LOADING,
  LOG_IN_STATUS_SUCCESS,
  LOG_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  GOOGLE_LOGIN_SUCCESS,
  FB_LOGIN_SUCCESS,
  AUTH_ERROR,
} from '../actions/AuthActions';
import { ApplicationState } from '@models/state';
import { HandlerAction, Handlers } from '../types';
import { UserBody } from 'models/user';
import { Reducer } from 'redux';
import { ErrorAlert } from 'models/base';

export type AuthState = ApplicationState['auth'];

const initState: AuthState = {
  loading: false,
  user: {},
  error: '',
};

const handlers: Handlers<AuthState> = {
  [AUTH_LOADING]: state => ({
    ...state,
    loading: true,
  }),
  [LOG_IN_STATUS_SUCCESS]: (state, action: HandlerAction<UserBody>) => ({
    ...state,
    user: action.payload,
    loading: false,
  }),
  [LOG_IN_SUCCESS]: (state, action: HandlerAction<UserBody>) => ({
    ...state,
    user: action.payload,
    loading: false,
  }),
  [SIGN_UP_SUCCESS]: (state, action: HandlerAction<UserBody>) => ({
    ...state,
    user: action.payload,
    loading: false,
  }),
  [GOOGLE_LOGIN_SUCCESS]: (state, action: HandlerAction<UserBody>) => ({
    ...state,
    user: action.payload,
    loading: false,
  }),
  [FB_LOGIN_SUCCESS]: (state, action: HandlerAction<UserBody>) => ({
    ...state,
    user: action.payload,
    loading: false,
  }),
  [AUTH_ERROR]: (state, action: HandlerAction<ErrorAlert>) => ({
    ...state,
    authError: action.payload,
    loading: false,
  }),
  DEFAULT: state => state,
};

const authReducer: Reducer<AuthState, HandlerAction> = (
  state = initState,
  action,
) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

export default authReducer;
