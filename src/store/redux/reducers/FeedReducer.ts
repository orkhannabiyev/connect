import { ErrorAlert } from 'models/base';
import { PostBody } from 'models/post';
import { ApplicationState } from 'models/state';
import { Reducer } from 'redux';
import {
  POSTS_LOADING,
  POSTS_SUCCESS,
  POSTS_ERROR,
  DELETE_POST_LOADING,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
} from '../actions/FeedActions';
import { HandlerAction, Handlers } from '@store/redux/types';

export type FeedState = ApplicationState['feed'];

const initState: FeedState = {
  posts: [],
  loading: false,
  deleted: false,
};

const handlers: Handlers<FeedState> = {
  [POSTS_LOADING]: state => ({
    ...state,
    loading: true,
  }),
  [POSTS_SUCCESS]: (state, action: HandlerAction<PostBody[]>) => ({
    ...state,
    loading: false,
    posts: action.payload,
  }),
  [POSTS_ERROR]: (state, action: HandlerAction<ErrorAlert>) => ({
    ...state,
    loading: false,
    postsError: action.payload,
  }),
  [DELETE_POST_LOADING]: state => ({
    ...state,
    loading: true,
  }),
  [DELETE_POST_SUCCESS]: (state, action: HandlerAction<number>) => ({
    ...state,
    loading: false,
    posts: state.posts.filter((item, index) => index !== action.payload),
  }),
  [DELETE_POST_ERROR]: (state, action: HandlerAction<ErrorAlert>) => ({
    ...state,
    loading: false,
    postsError: action.payload,
  }),
  DEFAULT: state => state,
};

const feedReducer: Reducer<FeedState, HandlerAction> = (
  state = initState,
  action,
) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

export default feedReducer;
