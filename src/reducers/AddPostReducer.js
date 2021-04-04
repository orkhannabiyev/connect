import {
  POST_LOADING,
  POST_SUCCESS,
  POST_ERROR,
} from '../actions/AddPostActions';

const initState = {
  post: {},
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
        post: action.payload,
        loading: true,
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
