import { GET_POSTS, DELETE_POST, POSTS_FAILED, LOADING } from '../types';

const initState = {
  posts: [],
  loading: true,
  deleted: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        deleted: false,
      };
    case DELETE_POST:
      return {
        ...state,
        deleted: action.payload,
        loading: true,
      };
    case POSTS_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
