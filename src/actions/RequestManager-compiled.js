"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCart = exports.postCart = exports.getUser = exports.getProduct = exports.getProducts = exports.GET_CART = exports.POST_CART = exports.GET_USER = exports.GET_PRODUCT = exports.GET_PRODUCTS = undefined;

var _SessionManager = require("./SessionManager");

var _SessionManager2 = _interopRequireDefault(_SessionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GET_PRODUCTS = exports.GET_PRODUCTS = "GET_PRODUCTS";
var GET_PRODUCT = exports.GET_PRODUCT = "GET_PRODUCT";
var GET_USER = exports.GET_USER = "GET_USER";
var POST_CART = exports.POST_CART = "POST_CART";
var GET_CART = exports.GET_CART = "GET_CART";

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

var getProducts = exports.getProducts = function getProducts() {
  var request = _SessionManager2.default.instance().get("/products");

  return {
    type: GET_PRODUCTS,
    payload: request
  };
};

var getProduct = exports.getProduct = function getProduct(params) {
  var request = _SessionManager2.default.instance().get("/product", params);

  return {
    type: GET_PRODUCT,
    payload: request
  };
};

var getUser = exports.getUser = function getUser(params) {
  var request = _SessionManager2.default.instance().get("/user", params);

  return {
    type: GET_USER,
    payload: request
  };
};

var postCart = exports.postCart = function postCart(params) {
  var request = _SessionManager2.default.instance().post("/cart", params);

  return {
    type: POST_CART,
    payload: request
  };
};

var getCart = exports.getCart = function getCart(params) {
  var request = _SessionManager2.default.instance().get("/cart", params);

  return {
    type: GET_CART,
    payload: request
  };
};

//# sourceMappingURL=RequestManager-compiled.js.map