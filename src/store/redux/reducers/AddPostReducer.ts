import {
  POST_LOADING,
  POST_SUCCESS,
  POST_ERROR,
} from '@store/redux/actions/AddPostActions';
import { ApplicationState } from '@models/state';
import { Reducer } from 'redux';
import { HandlerAction, Handlers } from '@store/redux/types';

export type AddPostState = ApplicationState['addPost'];

const initState: AddPostState = {
  loading: false,
};

const handlers: Handlers<AddPostState> = {
  [POST_LOADING]: state => ({
    ...state,
    loading: true,
  }),
  [POST_SUCCESS]: state => ({
    ...state,
    loading: false,
  }),
  [POST_ERROR]: state => ({
    ...state,
    loading: false,
  }),
  DEFAULT: state => state,
};

const addPostReducer: Reducer<AddPostState, HandlerAction> = (
  state = initState,
  action,
) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

export default addPostReducer;
