import { Alert } from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export const POST_LOADING = 'LOADING';
export const POST_SUCCESS = 'SUCCESS';
export const POST_ERROR = 'ERROR';

export const CREATE_POST = 'CREATE_POST';
export const createPost = (postText, imageUrl) => dispatch => {
  dispatch({
    type: CREATE_POST,
    payload: {
      post: postText,
      image: imageUrl,
    },
  });
};

export const submitPost = (user, post, image) => async dispatch => {
  console.log('submitPost');
  // dispatch({
  //   type: POST_LOADING,
  // });

  const imageUrl = await uploadImage(image);

  firestore()
    .collection('posts')
    .add({
      userId: user.uid,
      post: post,
      postImg: imageUrl,
      postTime: firestore.Timestamp.fromDate(new Date()),
      likes: null,
      comments: null,
    })
    .then(() => {
      console.log('Post Added!');
      Alert.alert(
        'Post published!',
        'Your post has been published Successfully!',
      );
      dispatch({
        type: POST_SUCCESS,
        payload: {
          post: null,
          image: null,
        },
      });
    })
    .catch(error => {
      console.log('Something went wrong with added post to firestore.', error);
    });
};

const uploadImage = async image => {
  if (image === null) {
    return null;
  }

  let fileName = image.substring(image.lastIndexOf('/') + 1);

  const extension = fileName.split('.').pop();
  const name = fileName.split('.').slice(0, -1).join('.');
  fileName = `${name}${Date.now()}.${extension}`;

  const storageRef = storage().ref(`photos/${fileName}`);
  const task = storageRef.putFile(image);

  task.on('state_changed', taskSnapshot => {
    console.log(
      `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
    );
  });

  try {
    await task;
    const url = await storageRef.getDownloadURL();

    return url;
  } catch (e) {
    console.log(e);
    return null;
  }
};
