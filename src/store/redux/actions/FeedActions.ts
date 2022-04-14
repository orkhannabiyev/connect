import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { PostBody } from 'models/post';
import { Dispatch } from 'store/redux/types';

export const POSTS_LOADING = 'POSTS_LOADING';
export const POSTS_SUCCESS = 'POSTS_SUCCESS';
export const POSTS_ERROR = 'POSTS_ERROR';

export const getPosts = () => async (dispatch: Dispatch) => {
  const posts: PostBody[] = [];

  try {
    dispatch({
      type: POSTS_LOADING,
    });

    firestore()
      .collection('posts')
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length) {
          querySnapshot.forEach(doc => {
            const {
              userId,
              userName,
              userImg,
              post,
              postImg,
              postTime,
              likes,
              comments,
            } = doc.data();
            posts.push({
              id: doc.id,
              userId,
              userName,
              userImg,
              postTime: postTime,
              post,
              postImg,
              liked: false,
              likes,
              comments,
            });
            return dispatch({
              type: POSTS_SUCCESS,
              payload: posts,
            });
          });
        }
        dispatch({
          type: POSTS_SUCCESS,
          payload: posts,
        });
      });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: err,
    });
  }
};

export const DELETE_POST_LOADING = 'DELETE_POST_LOADING';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_ERROR = 'DELETE_POST_ERROR';

export const deletePost =
  (postId: string, index: number) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: DELETE_POST_LOADING,
      });
      dispatch({
        type: DELETE_POST_SUCCESS,
        payload: index,
      });
      firestore()
        .collection('posts')
        .doc(postId)
        .get()
        .then(documentSnapshot => {
          if (!documentSnapshot.exists) {
            return;
          }
          const { postImg } = documentSnapshot.data();

          if (postImg) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            return imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully.`);
                deleteFirestoreData(postId);
              })
              .catch(e => {
                console.log('Error while deleting the image. ', e);
              });
          }
          deleteFirestoreData(postId);
        });
    } catch (err) {
      dispatch({
        type: DELETE_POST_ERROR,
      });
    }
  };

const deleteFirestoreData = (postId: string) => {
  firestore()
    .collection('posts')
    .doc(postId)
    .delete()
    .then(() => {})
    .catch(e => console.log('Error deleting posst.', e));
};
