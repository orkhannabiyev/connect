import firestore from '@react-native-firebase/firestore';

import { uploadImage } from 'utils/UploadImage';
import { PostBody } from 'models/post';
import { UserBody } from 'models/user';
import { Dispatch } from 'store/redux/types';

export const POST_LOADING = 'POST_LOADING';
export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_ERROR = 'POST_ERROR';

export const submitPost =
  (user: UserBody, post: PostBody, image: string) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: POST_LOADING,
    });

    const imageUrl = await uploadImage(image);

    firestore()
      .collection('posts')
      .add({
        userId: user.uid,
        userName: user.displayName,
        userImg: user.photoURL || null,
        post: post,
        postImg: imageUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
        likes: null,
        comments: null,
      })
      .then(() => {
        console.log('Post Added!');
        dispatch({
          type: POST_SUCCESS,
        });
      })
      .catch(error => {
        console.log(
          'Something went wrong with added post to firestore.',
          error,
        );
        dispatch({
          type: POST_ERROR,
        });
      });
  };
