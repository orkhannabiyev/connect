import React, { FC, useEffect } from 'react';
import { FlatList, Alert, SafeAreaView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Container } from '@styles/FeedStyles';
import { PostCard, ShimmerEffect } from 'components';
import { getPosts, deletePost } from '../store/redux/actions/FeedActions';
import { PostBody } from 'models/post';
import { UserBody } from 'models/user';

type FeedScreenType = {
  navigation
  posts: PostBody[];
  user: UserBody;
};

const FeedScreen: FC<FeedScreenType> = ({
  navigation,
  getPosts,
  deletePost,
  posts,
  loading,
  deleted,
  user,
}) => {
  useEffect(() => {
    getPosts();
  }, [deleted]);

  const handleDelete = (postId: string) => {
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

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ShimmerEffect />
      ) : (
        <Container>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <PostCard
                post={item}
                user={user}
                onDelete={handleDelete}
                onPress={() =>
                  navigation.navigate('Profile', { userId: item.userId })
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

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
