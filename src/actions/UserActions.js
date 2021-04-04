import firestore from '@react-native-firebase/firestore';

export const USER_LOADING = 'USER_LOADING';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_ERROR = 'USER_ERROR';

export const getUser = (route, user) => {
  return dispatch => {
    dispatch({
      type: USER_LOADING,
    });
    firestore()
      .collection('users')
      .doc(route.params ? route.params.userId : user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          dispatch({
            type: USER_SUCCESS,
            payload: documentSnapshot.data(),
          });
        }
      })
      .catch(error => {
        dispatch({
          type: USER_ERROR,
          payload: error,
        });
      });
  };
};
