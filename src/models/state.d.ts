import { PostBody } from './post';
import { UserBody } from './user';
import { UserProfile } from './userProfile';

export type ApplicationState = {
  addPost: {
    loading: boolean;
  };
  auth: {
    login: boolean;
    user: UserBody;
  };
  feed: {
    loading: boolean;
    posts: PostBody[];
    deleted: boolean;
  };
  selfPosts: {
    loading: boolean;
    posts: PostBody[];
  };
  user: {
    loading: boolean;
    data: UserProfile;
  };
};
