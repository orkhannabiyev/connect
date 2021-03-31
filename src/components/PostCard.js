import React, { useContext } from 'react';
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
  PostImg,
  Divider,
  InteractionWrapper,
  Interaction,
  InteractionText,
} from '../styles/FeedStyles';
import { AuthContext } from '../navigation/AuthProvider';

const PostCard = ({ item, onDelete }) => {
  const { user } = useContext(AuthContext);
  const likeIcon = item.liked ? 'heart' : 'heart-outline';
  const likeIconColor = item.liked ? '#2e64e5' : '#fff';

  return (
    <Card>
      <UserInfo>
        <UserImg source={{ uri: item.userImg }} />
        <UserInfoText>
          <UserName>{item.userName}</UserName>
          <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {item.postImg !== null ? (
        <PostImg source={{ uri: item.postImg }} />
      ) : (
        <Divider />
      )}
      <Divider />
      <InteractionWrapper>
        <Interaction active={item.liked}>
          <Ionicons name={likeIcon} size={25} color={likeIconColor} />
          <InteractionText active={item.liked}>
            {item.likes} Likes
          </InteractionText>
        </Interaction>
        <Interaction>
          <Ionicons name="md-chatbubble-outline" size={25} />
          <InteractionText>comment</InteractionText>
        </Interaction>
        {user.uid === item.userId ? (
          <Interaction onPress={() => onDelete(item.id)}>
            <Ionicons name="md-trash-bin" size={25} />
          </Interaction>
        ) : null}
      </InteractionWrapper>
    </Card>
  );
};

export { PostCard };
