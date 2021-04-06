import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';

import { AuthContext } from '../navigation/AuthProvider';
import { createPost, submitPost } from '../actions/AddPostActions';

import {
  InputWrapper,
  InputField,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../styles/AddPost';

const AddPostScreen = ({ post, image, loading, submitPost, createPost }) => {
  const { user } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState(null);
  const [postText, setPostText] = useState(null);

  const takePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImageUrl(image.path);
    });
  };
  const takePhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImageUrl(image.path);
    });
  };

  useEffect(() => {
    createPost(postText, imageUrl);
  }, [postText, imageUrl]);

  return (
    <View style={styles.container}>
      <InputWrapper>
        {image !== null ? <AddImage source={{ uri: imageUrl }} /> : null}
        <InputField
          placeholder="What's on your mind?"
          multiline
          numberOfLines={4}
          value={post}
          onChangeText={content => setPostText(content)}
        />
        {loading ? (
          <StatusWrapper>
            <ActivityIndicator size="large" color="#123456" />
          </StatusWrapper>
        ) : (
          <SubmitBtn onPress={() => submitPost(user, post, image)}>
            <SubmitBtnText>Post</SubmitBtnText>
          </SubmitBtn>
        )}
      </InputWrapper>
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Library"
          onPress={takePhotoFromLibrary}>
          <Icon name="md-create" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Take Photo"
          onPress={takePhoto}>
          <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

const mapStateToProps = ({ addPost }) => ({
  post: addPost.payload.post,
  image: addPost.payload.image,
  loading: addPost.loading,
});

const mapDispatchToProps = {
  submitPost,
  createPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPostScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
