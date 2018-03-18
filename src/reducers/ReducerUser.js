import { POST_LOGIN } from '../actions/RequestManager';

const INITIAL_STATE = { user: null };


export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case POST_LOGIN:
      return { ...state, user: action.payload.data.user };

    default:
      return { ...state };
  }
}