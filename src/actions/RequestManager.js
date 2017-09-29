import SessionManager from './SessionManager';

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT = "GET_PRODUCT";
export const GET_USER = "GET_USER";

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

// export const postCart =