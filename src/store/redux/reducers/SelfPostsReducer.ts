import { ErrorAlert } from 'models/base';
import { PostBody } from 'models/post';
import { ApplicationState } from 'models/state';
import { Reducer } from 'redux';

import { HandlerAction, Handlers } from '@store/redux/types';

import {
  SELF_POSTS_LOADING,
  SELF_POSTS_SUCCESS,
  SELF_POSTS_ERROR,
} from '@store/redux/actions/SelfPostsAction';

export type SelfPostState = ApplicationState['selfPosts'];

const initState: SelfPostState = {
  posts: [],
  loading: false,
};

const handlers: Handlers<SelfPostState> = {
  [SELF_POSTS_LOADING]: state => ({
    ...state,
    loading: true,
  }),
  [SELF_POSTS_SUCCESS]: (state, action: HandlerAction<PostBody[]>) => ({
    ...state,
    posts: action.payload,
    loading: false,
  }),
  [SELF_POSTS_ERROR]: (state, action: HandlerAction<ErrorAlert>) => ({
    ...state,
    error: action.payload,
    loading: false,
  }),
  DEFAULT: state => state,
};

const selfPostsReducer: Reducer<SelfPostState, HandlerAction> = (
  state = initState,
  action,
) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

export default selfPostsReducer;
