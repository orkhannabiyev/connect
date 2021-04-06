import {
  CREATE_POST,
  POST_LOADING,
  POST_SUCCESS,
  POST_ERROR,
} from '../actions/AddPostActions';

const initState = {
  loading: false,
  payload: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        payload: action.payload,
        loading: false,
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case POST_SUCCESS:
      return {
        ...state,
        payload: action.payload,
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
