import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const GET_POSTS = 'GET_POSTS';
export const POSTS_FAILED = 'POSTS_FAILED';
export const LOADING = 'LOADING';
export const DELETE_POST = 'DELETE_POST';

export const getPosts = () => {
  const posts = [];

  return dispatch => {
    dispatch({
      type: LOADING,
    });
    firestore()
      .collection('posts')
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length) {
          querySnapshot.forEach(doc => {
            const {
              userId,
              post,
              postImg,
              postTime,
              likes,
              comments,
            } = doc.data();
            posts.push({
              id: doc.id,
              userId,
              userName: 'Test Name',
              userImg:
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
              postTime: postTime,
              post,
              postImg,
              liked: false,
              likes,
              comments,
            });
            dispatch({
              type: GET_POSTS,
              payload: posts,
            });
          });
        } else {
          dispatch({
            type: GET_POSTS,
            payload: posts,
          });
        }
      })
      .catch(err => {
        dispatch({
          type: POSTS_FAILED,
          payload: err,
        });
      });
  };
};

export const deletePost = postId => {
  return dispatch => {
    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const { postImg } = documentSnapshot.data();

          if (postImg !== null) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully.`);
                deleteFirestoreData(postId);
                dispatch({
                  type: DELETE_POST,
                  payload: true,
                });
              })
              .catch(e => {
                console.log('Error while deleting the image. ', e);
              });
          } else {
            deleteFirestoreData(postId);
            dispatch({
              type: DELETE_POST,
              payload: true,
            });
          }
        }
      });
  };
};

const deleteFirestoreData = postId => {
  firestore()
    .collection('posts')
    .doc(postId)
    .delete()
    .then(() => {
      Alert.alert('Post deleted!', 'Your post has been deleted successfully!');
    })
    .catch(e => console.log('Error deleting posst.', e));
};
