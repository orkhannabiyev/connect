import React, { FC, useEffect } from 'react';
import { FlatList, Alert, SafeAreaView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Container } from '@styles/FeedStyles';
import { PostCard, ShimmerEffect } from 'components';
import { getPosts, deletePost } from '../store/redux/actions/FeedActions';
import { PostBody } from 'models/post';
import { UserBody } from 'models/user';
import { NavigationProp } from '@react-navigation/core';
import { AppStackParams } from 'navigation/types/appStackTypes';
import { PROFILE_ROUTES } from 'navigation/stacks/AppStack';

type FeedScreenType = {
  navigation: NavigationProp<AppStackParams>;
  posts: PostBody[];
  user: UserBody;
  getPosts: () => void;
  deletePost: (postId: string, index: number) => void;
  loading: boolean;
  deleted: boolean;
};

const FeedScreen: FC<FeedScreenType> = ({
  navigation,
  getPosts,
  deletePost,
  posts,
  loading,
  user,
}) => {
  useEffect(() => {
    getPosts();
  }, []);

  const handleDelete = (postId: string, index: number) => {
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
          onPress: () => deletePost(postId, index),
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ShimmerEffect />
      ) : (
        <Container>
          <FlatList
            data={posts}
            renderItem={({ item, index }) => (
              <PostCard
                post={item}
                user={user}
                postIndex={index}
                onDelete={handleDelete}
                onPress={() =>
                  navigation.navigate(PROFILE_ROUTES.PROFILE, {
                    userId: item.userId,
                  })
                }
              />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            onRefresh={getPosts}
            refreshing={loading}
          />
        </Container>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = ({ feed, auth, userProfile }) => ({
  posts: feed.posts,
  loading: feed.loading,
  deleted: feed.deleted,
  user: auth.user,
  userProfile: userProfile.data,
});

const mapDispatchToProps = {
  getPosts,
  deletePost,
};

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(FeedScreen),
);
