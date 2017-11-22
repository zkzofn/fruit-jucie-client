import { GET_VALIDATE } from '../actions/RequestManager';

const INITIAL_STATE = { isLogin: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_VALIDATE:
      return { ...state, isLogin: action.payload.data.validate };

    default:
      return state;
  }
}