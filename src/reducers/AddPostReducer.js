import {
  POST_LOADING,
  POST_SUCCESS,
  POST_ERROR,
} from '../actions/AddPostActions';

const initState = {
  loading: false,
};

export default (state = initState, action) => {
  console.log('ADD POST STATE: ', state);
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case POST_SUCCESS:
      return {
        ...state,
        loading: action.loading,
      };
    case POST_ERROR:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};
