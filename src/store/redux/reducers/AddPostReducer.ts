import {
  POST_LOADING,
  POST_SUCCESS,
  POST_ERROR,
} from '../actions/AddPostActions';
import { ApplicationState } from '@models/state';

export type AddPost = ApplicationState['addPost'];

const initState: AddPost = {
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case POST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
