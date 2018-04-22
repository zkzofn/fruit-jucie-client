import { GET_ADDRESS_LIST } from '../actions/RequestManager';

const INITIAL_STATE = { addressList: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ADDRESS_LIST:
      return { ...state, addressList: action.payload.data.addressList };

    default:
      return state;
  }
}