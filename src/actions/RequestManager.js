import SessionManager from './SessionManager';
import axios from 'axios';

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT = "GET_PRODUCT";
export const GET_PRODUCT_CHECK = "GET_PRODUCT_CHECK";
export const GET_USER = "GET_USER";
export const POST_CART = "POST_CART";
export const GET_CART = "GET_CART";
export const PATCH_CART = "PATCH_CART";
export const DELETE_CART = "DELETE_CART";
export const GET_ADDRESS_FROM_API = "GET_ADDRESS_FROM_API";
export const GET_ADDRESS_LIST = "GET_ADDRESS_LIST";
export const POST_ORDER = "POST_ORDER";
export const GET_VALIDATE = "GET_VALIDATE";
export const POST_LOGIN = "POST_LOGIN";
export const GET_MY_ORDER_LIST = "GET_MY_ORDER_LIST";

// export const getSomethings = ({pageNo, length, indexBy, indexType, values}) => {
//   const query = {
//     pageNo, length
//   };
//
//   if (indexBy !== undefined) query["indexBy"] = indexBy;
//   if(indexType !== undefined) query["indexType"] = indexType;
//   if (values !== undefined) query["values"] = encodeURI(JSON.stringify(values));
//
//   const request = SessionManager.instance().get("/somethings", query);
//
//   return {
//     type: GET_SOMETHINGS,
//     payload: request
//   }
// };

export const getProducts = () => {
  const request = SessionManager.instance().get(`/products`);
  
  return {
    type: GET_PRODUCTS,
    payload: request
  }
};

export const getProduct = (params) => {
  const request = SessionManager.instance().get(`/product`, params);

  return {
    type: GET_PRODUCT,
    payload: request
  }
};

export const getProductCheck = (params) => {
  const request = SessionManager.instance().get(`/product/check`, params);

  return {
    type: GET_PRODUCT_CHECK,
    payload: request
  }
};

export const getValidate = () => {
  const request = SessionManager.instance().get(`/user/validate`);

  return {
    type: GET_VALIDATE,
    payload: request
  }
};

export const getUser = () => {
  const request = SessionManager.instance().get(`/user`);

  return {
    type: GET_USER,
    payload: request
  }
};

export const postCart = (data) => {
  const request = SessionManager.instance().post(`/cart`, data);

  return {
    type: POST_CART,
    payload: request
  }
};

export const getCart = () => {
  const request = SessionManager.instance().get(`/cart`);

  return {
    type: GET_CART,
    payload: request
  }
};

export const patchCart = (data) => {
  const request = SessionManager.instance().patch(`/cart`, data);
  
  return {
    type: PATCH_CART,
    payload: request
  }
};

export const delCart = (params) => {
  const request = SessionManager.instance().del(`/cart`, params);

  return {
    type: DELETE_CART,
    payload: request
  }
};

export const getAddressFromAPI = (data) => {
  const request = axios({
    method: "post",
    url: "http://www.juso.go.kr/addrlink/addrLinkApi.do",
    data
  });

  return {
    type: GET_ADDRESS_FROM_API,
    payload: request
  }
};

export const getAddressList = () => {
  const request = SessionManager.instance().get(`/address`);

  return {
    type: GET_ADDRESS_LIST,
    payload: request
  }
};

export const postOrder = (data) => {
  const request = SessionManager.instance().post(`/order`, data);

  return {
    type: POST_ORDER,
    payload: request
  }
};

export const postLogin = (data) => {
  const request = SessionManager.instance().post(`/user/login`, data);

  return {
    type: POST_LOGIN,
    payload: request
  }
};

export const getMyOrderList = (params) => {
  const request = SessionManager.instance().get(`/order/user`);

  return {
    type: GET_MY_ORDER_LIST,
    payload: request
  }
};
