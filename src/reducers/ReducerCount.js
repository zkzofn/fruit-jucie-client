import { ADD_COUNT, REMOVE_COUNT } from '../actions/RequestManager';

const INITIAL_STATE = { value: 1 };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_COUNT:
      return { ...state, value: state.value + 1 };

    case REMOVE_COUNT:
      return { ...state, value: state.value - 1 };

    default:
      return state;
  }
}