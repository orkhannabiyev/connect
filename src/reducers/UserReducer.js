import { USER_LOADING, USER_SUCCESS, USER_ERROR } from '../actions/UserActions';

const initState = {
  profile: {},
  loading: false,
};

export default (state = initState, action) => {
  // console.log('USER REDUCER', action.payload);
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
