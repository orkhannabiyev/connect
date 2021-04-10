import {
  LOG_IN_LOADING,
  LOG_IN_SUCCESS,
  LOG_IN_ERROR,
  SIGN_UP_LOADING,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  LOG_OUT_LOADING,
  LOG_OUT_SUCCESS,
  LOG_OUT_ERROR,
} from '../actions/AuthActions';

const initState = {
  user: null,
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOG_IN_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case LOG_IN_ERROR:
      return {
        ...state,
        loading: false,
      };
    case SIGN_UP_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        loading: false,
      };
    case LOG_OUT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case LOG_OUT_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
