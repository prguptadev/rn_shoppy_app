import { AUTHENTICATE, LOGOUT, DID_YOU_TRY_AGAIN } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  didyoutryLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT: {
      return initialState;
    }
    case DID_YOU_TRY_AGAIN: {
      return {
        ...state,
        didyoutryLogin: true,
      };
    }

    case AUTHENTICATE: {
      return {
        token: action.token,
        userId: action.userId,
        didyoutryLogin: true,
      };
    }
    // case SIGNUP: {
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   };
    // }
    default:
      return state;
  }
};
