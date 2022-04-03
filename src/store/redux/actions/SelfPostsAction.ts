import firestore from '@react-native-firebase/firestore';
import { PostBody } from 'models/post';
import { UserBody } from 'models/user';
import { Dispatch } from 'store/redux/types';
import { AppScreenRouteProp } from 'navigation/types/appStackTypes';

export const SELF_POSTS_LOADING = 'PROFILE_LOADING';
export const SELF_POSTS_SUCCESS = 'PROFILE_SUCCESS';
export const SELF_POSTS_ERROR = 'PROFILE_ERROR';

export const selfPosts = (route: AppScreenRouteProp, user: UserBody) => {
  const list: PostBody[] = [];

  return (dispatch: Dispatch) => {
    try {
      dispatch({
        type: SELF_POSTS_LOADING,
      });
      firestore()
        .collection('posts')
        .where('userId', '==', route.params ? route.params.userId : user.uid)
        .orderBy('postTime', 'desc')
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
                liked,
                likes,
                comments,
              } = doc.data();
              list.push({
                id: doc.id,
                userId,
                userName,
                userImg,
                postTime,
                post,
                postImg,
                liked,
                likes,
                comments,
              });
              return dispatch({
                type: SELF_POSTS_SUCCESS,
                payload: list,
              });
            });
          }
          dispatch({
            type: SELF_POSTS_SUCCESS,
            payload: list,
          });
        });
    } catch (error) {
      dispatch({
        type: SELF_POSTS_ERROR,
        payload: error,
      });
    }
  };
};
