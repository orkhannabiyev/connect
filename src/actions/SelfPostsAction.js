import firestore from '@react-native-firebase/firestore';

export const SELF_POSTS_LOADING = 'PROFILE_LOADING';
export const SELF_POSTS_SUCCESS = 'PROFILE_SUCCESS';
export const SELF_POSTS_ERROR = 'PROFILE_ERROR';

export const selfPosts = (route, user) => {
  const list = [];

  return dispatch => {
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
              post,
              postImg,
              postTime,
              likes,
              comments,
            } = doc.data();
            list.push({
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
              type: SELF_POSTS_SUCCESS,
              payload: list,
            });
          });
        } else {
          dispatch({
            type: SELF_POSTS_SUCCESS,
            payload: list,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: SELF_POSTS_ERROR,
          payload: error,
        });
      });
  };
};
