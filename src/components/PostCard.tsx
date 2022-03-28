import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import {
  Card,
  UserInfo,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  PostText,
  Divider,
  InteractionWrapper,
  Interaction,
  InteractionText,
} from '../styles/FeedStyles';
import ProgressiveImage from './ProgressiveImage';
import { PostBody } from '@models/post';
import { UserBody } from 'models/user';

type PostCardType = {
  post: PostBody;
  user: UserBody;
  onDelete: () => void;
  onPress: () => void;
};

const PostCard: FC<PostCardType> = ({ post, user, onDelete, onPress }) => {
  const likeIcon = post.liked ? 'heart' : 'heart-outline';
  const likeIconColor = post.liked ? '#2e64e5' : '#fff';
  // console.log('POST', post);
  // console.log('USER', JSON.stringify(user, null, 3));

  return (
    <Card>
      <UserInfo>
        <UserImg
          source={{
            uri:
              post.userImg ||
              'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
          }}
        />
        <UserInfoText>
          <TouchableOpacity onPress={onPress}>
            <UserName>{post.userName}</UserName>
            <PostTime>{moment(post.postTime.toDate()).fromNow()}</PostTime>
          </TouchableOpacity>
        </UserInfoText>
      </UserInfo>
      <PostText>{post.post}</PostText>
      {post.postImg != null ? (
        <ProgressiveImage
          defaultImageSource={require('../assets/default-img.jpg')}
          source={{ uri: post.postImg }}
          style={{ width: '100%', height: 250 }}
          resizeMode="cover"
        />
      ) : (
        <Divider />
      )}

      <InteractionWrapper>
        <Interaction active={post.liked}>
          <Ionicons name={likeIcon} size={25} color={likeIconColor} />
          <InteractionText active={post.liked}>
            {post.likes} Likes
          </InteractionText>
        </Interaction>
        <Interaction>
          <Ionicons name="md-chatbubble-outline" size={25} />
          <InteractionText>comment</InteractionText>
        </Interaction>
        {user && user.uid === post.userId ? (
          <Interaction onPress={() => onDelete(post.id)}>
            <Ionicons name="md-trash-bin" size={25} />
          </Interaction>
        ) : null}
      </InteractionWrapper>
    </Card>
  );
};

export { PostCard };
