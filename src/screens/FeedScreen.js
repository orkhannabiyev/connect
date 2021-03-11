import React from 'react';

import { posts } from '../components/Posts';
import { Container } from '../styles/FeedStyles';
import { PostCard } from '../components/PostCard';
import { FlatList } from 'react-native';

const FeedScreen = () => {
  return (
    <Container>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default FeedScreen;
