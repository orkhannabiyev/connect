import { combineReducers } from 'redux';
import FeedReducer from './FeedReducer';
import AddPostReducer from './AddPostReducer';
import SelfPostsReducer from './SelfPostsReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  feed: FeedReducer,
  selfposts: SelfPostsReducer,
  user: UserReducer,
  addPost: AddPostReducer,
});
