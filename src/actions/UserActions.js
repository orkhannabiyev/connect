import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { uploadImage } from '../utils/UploadImage';

export const USER_LOADING = 'USER_LOADING';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_DOES_NOT_EXIST = 'USER_DOES_NOT_EXIST';
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
        dispatch({
          type: USER_DOES_NOT_EXIST,
        });
      })
      .catch(error => {
        dispatch({
          type: USER_ERROR,
          payload: error,
        });
      });
  };
};

export const handleUpdate = async (userUid, userData, image) => {
  let imgUrl = await uploadImage(image);

  if (imgUrl == null && userData.userImg) {
    imgUrl = userData.userImg;
  }

  firestore()
    .collection('users')
    .doc(userUid)
    .set({
      fname: userData.fname,
      lname: userData.lname,
      about: userData.about,
      phone: userData.phone,
      country: userData.country,
      city: userData.city,
      userImg: imgUrl,
    })
    .then(() => {
      console.log('User Updated!');
      Alert.alert(
        'Profile Updated!',
        'Your profile has been updated successfully.',
      );
    })
    .catch(err => {
      console.log('ERROR', err);
    });
};

export const REMOVE_USER = 'REMOVE_USER';
export const removeUser = () => {
  return dispatch =>
    dispatch({
      type: REMOVE_USER,
      payload: null,
    });
};
