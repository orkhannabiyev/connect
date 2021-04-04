import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import FeedReducer from './FeedReducer';
import AddPostReducer from './AddPostReducer';
import SelfPostsReducer from './SelfPostsReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  // form: formReducer,
  feed: FeedReducer,
  selfposts: SelfPostsReducer,
  user: UserReducer,
  // addPost: AddPostReducer,
});
