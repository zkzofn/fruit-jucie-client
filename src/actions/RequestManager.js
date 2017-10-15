import SessionManager from './SessionManager';
import axios from 'axios';
import $ from 'jquery/dist/jquery.min';

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT = "GET_PRODUCT";
export const GET_USER = "GET_USER";
export const POST_CART = "POST_CART";
export const GET_CART = "GET_CART";
export const PATCH_CART = "PATCH_CART";
export const DELETE_CART = "DELETE_CART";
export const GET_ADDRESS = "GET_ADDRESS";


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

export const getUser = (params) => {
  const request = SessionManager.instance().get(`/user`, params);

  return {
    type: GET_USER,
    payload: request
  }
};

export const postCart = (params) => {
  const request = SessionManager.instance().post(`/cart`, params);

  return {
    type: POST_CART,
    payload: request
  }
};

export const getCart = (params) => {
  const request = SessionManager.instance().get(`/cart`, params);

  return {
    type: GET_CART,
    payload: request
  }
};

export const patchCart = (params) => {
  const request = SessionManager.instance().patch(`/cart`, params);
  
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

export const getAddress = (data) => {
  const request = axios({
    method: "post",
    url: "http://www.juso.go.kr/addrlink/addrLinkApi.do",
    data
  });

  // const request = $.ajax({
  //   url: "http://www.juso.go.kr/addrlink/addrLinkApi.do",
  //   type:"post",
  //   data,
  //   dataType: "json",
  //   crossDomain: true
  // });


  
  return {
    type: GET_ADDRESS,
    payload: request
  }
};