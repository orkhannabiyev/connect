import { Alert } from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export const POST_LOADING = 'LOADING';
export const POST_SUCCESS = 'SUCCESS';
export const POST_ERROR = 'ERROR';

export const submitPost = async () => {
  const imageUrl = await uploadImage();

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
      setPost(null);
    })
    .catch(error => {
      console.log('Something went wrong with added post to firestore.', error);
    });
};

const uploadImage = async () => {
  if (image === null) {
    return null;
  }

  let fileName = image.substring(image.lastIndexOf('/') + 1);

  const extension = fileName.split('.').pop();
  const name = fileName.split('.').slice(0, -1).join('.');
  fileName = `${name}${Date.now()}.${extension}`;

  setUploading(true);
  setTransferred(0);

  const storageRef = storage().ref(`photos/${fileName}`);
  const task = storageRef.putFile(image);

  task.on('state_changed', taskSnapshot => {
    console.log(
      `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
    );

    setTransferred(
      Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
    );
  });

  try {
    await task;
    const url = await storageRef.getDownloadURL();

    setUploading(false);
    setImage(null);

    return url;
  } catch (e) {
    console.log(e);
    return null;
  }
};
