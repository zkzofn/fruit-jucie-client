import { GET_USER } from '../actions/RequestManager';

const INITIAL_STATE = { single: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, single: action.payload.data.user };
  }
  return state;
}