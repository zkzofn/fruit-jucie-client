import { GET_MY_ORDER_LIST } from '../actions/RequestManager';

const INITIAL_STATE = { items: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_MY_ORDER_LIST:
      return { ...state, items: action.payload.data.results };

    default:
      return state;
  }
}