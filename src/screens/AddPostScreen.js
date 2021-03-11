import React, { useState } from 'react';
import { StyleSheet, View, Alert, Text, ActivityIndicator } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

import {
  InputWrapper,
  InputField,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../styles/AddPost';

const HomeScreen = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const takePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
      setImage(image.path);
    });
  };
  const takePhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setImage(image.path);
    });
  };

  const submitPost = async () => {
    let fileName = image.substring(image.lastIndexOf('/') + 1);

    const extension = fileName.split('.').pop();
    const name = fileName.split('.').slice(0, -1).join('.');
    fileName = `${name}${Date.now()}.${extension}`;

    setUploading(true);
    setTransferred(0);

    const task = storage().ref(fileName).putFile(image);

    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;
      setUploading(false);
      Alert.alert(
        'Image uploaded',
        'Your image has been uploaded to firebase successfully',
      );
    } catch (e) {
      console.log(e);
    }

    setImage(null);
  };

  return (
    <View style={styles.container}>
      <InputWrapper>
        {image !== null ? <AddImage source={{ uri: image }} /> : null}
        <InputField placeholder="what?" multiline numberOfLines={4} />
        {uploading ? (
          <StatusWrapper>
            <Text>{transferred}% status</Text>
            <ActivityIndicator size="large" color="#fff111" />
          </StatusWrapper>
        ) : (
          <SubmitBtn onPress={submitPost}>
            <SubmitBtnText>POst</SubmitBtnText>
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
        <ActionButton.Item
          buttonColor="#1abc9c"
          title="All Tasks"
          onPress={() => {}}>
          <Icon name="heart" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

export default HomeScreen;

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
