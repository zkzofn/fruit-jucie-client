import { GET_PRODUCT, GET_PRODUCTS } from '../actions/RequestManager';

const INITIAL_STATE = { product: { days: null }, products: [] };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return { ...state, product: action.payload.data.product };

    case GET_PRODUCTS:
      return { ...state, products: action.payload.data.products };

    default:
      return state;
  }
}