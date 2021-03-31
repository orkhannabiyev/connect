import React, { useEffect, useState } from 'react';
import { FlatList, Alert, SafeAreaView, View, ScrollView } from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { Container } from '../styles/FeedStyles';
import { PostCard } from '../components';

const FeedScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const fetchPosts = async () => {
    const list = [];

    try {
      await firestore()
        .collection('posts')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
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
              post,
              postImg,
              postTime: postTime,
              likes,
              comments,
            });
          });
        });
      setPosts(list);

      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
    setDeleted(false);
  }, [deleted]);

  const handleDelete = (postId) => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      { cancelable: false },
    );
  };

  const deletePost = (postId) => {
    console.log('POSTID', postId);
    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const { postImg } = documentSnapshot.data();

          if (postImg != null) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully.`);
                deleteFirestoreData(postId);
                setDeleted(true);
              })
              .catch((e) => {
                console.log('Error while deleting the image. ', e);
              });
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };

  const deleteFirestoreData = (postId) => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          'Post deleted!',
          'Your post has been deleted successfully!',
        );
        setDeleted(true);
      })
      .catch((e) => console.log('Error deleting posst.', e));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ alignItems: 'center' }}>
          <SkeletonPlaceholder>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 60, height: 60, borderRadius: 50 }} />
              <View style={{ marginLeft: 20 }}>
                <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                <View
                  style={{
                    marginTop: 6,
                    width: 80,
                    height: 20,
                    borderRadius: 4,
                  }}
                />
              </View>
            </View>
            <View style={{ marginTop: 10, marginBottom: 30 }}>
              <View style={{ width: 300, height: 20, borderRadius: 4 }} />
              <View
                style={{
                  marginTop: 6,
                  width: 250,
                  height: 20,
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  marginTop: 6,
                  width: 350,
                  height: 200,
                  borderRadius: 4,
                }}
              />
            </View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 60, height: 60, borderRadius: 50 }} />
              <View style={{ marginLeft: 20 }}>
                <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                <View
                  style={{
                    marginTop: 6,
                    width: 80,
                    height: 20,
                    borderRadius: 4,
                  }}
                />
              </View>
            </View>
            <View style={{ marginTop: 10, marginBottom: 30 }}>
              <View style={{ width: 300, height: 20, borderRadius: 4 }} />
              <View
                style={{
                  marginTop: 6,
                  width: 250,
                  height: 20,
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  marginTop: 6,
                  width: 350,
                  height: 200,
                  borderRadius: 4,
                }}
              />
            </View>
          </SkeletonPlaceholder>
        </ScrollView>
      ) : (
        <Container>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <PostCard
                item={item}
                onDelete={handleDelete}
                onPress={() => {}}
              />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </Container>
      )}
    </SafeAreaView>
  );
};

export { FeedScreen };
