import auth from '@react-native-firebase/auth';

export const LOG_IN_LOADING = 'LOG_IN_LOADING';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_ERROR = 'LOG_IN_ERROR';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: LOG_IN_LOADING,
    });
    const user = await auth().signInWithEmailAndPassword(email, password);
    dispatch({
      type: LOG_IN_SUCCESS,
      payload: user,
    });
  } catch (err) {
    dispatch({
      type: LOG_IN_ERROR,
    });
  }
};

export const SIGN_UP_LOADING = 'SIGN_UP_LOADING';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';

export const register = (email, password) => async dispatch => {
  try {
    dispatch({
      type: SIGN_UP_LOADING,
    });
    const user = await auth().createUserWithEmailAndPassword(email, password);
    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: user,
    });
  } catch (e) {
    dispatch({
      type: SIGN_UP_ERROR,
    });
  }
};

export const LOG_OUT_LOADING = 'LOG_OUT_LOADING';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_ERROR = 'LOG_OUT_ERROR';

export const logout = () => async dispatch => {
  try {
    dispatch({
      type: LOG_OUT_LOADING,
    });
    await auth().signOut();
    dispatch({
      type: LOG_IN_SUCCESS,
      payload: null,
    });
  } catch (e) {
    dispatch({
      type: LOG_IN_ERROR,
    });
  }
};
