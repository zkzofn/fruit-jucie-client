import SessionManager from './SessionManager';

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT = "GET_PRODUCT";

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

export const getProduct = (productID) => {
  const request = SessionManager.instance().get(`/product`, productID);

  return {
    type: GET_PRODUCT,
    payload: request
  }
}