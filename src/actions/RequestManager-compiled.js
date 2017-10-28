'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postOrder = exports.getMyAddressList = exports.getAddressFromAPI = exports.delCart = exports.patchCart = exports.getCart = exports.postCart = exports.getUser = exports.getProduct = exports.getProducts = exports.POST_ORDER = exports.GET_MY_ADDRESS_LIST = exports.GET_ADDRESS_FROM_API = exports.DELETE_CART = exports.PATCH_CART = exports.GET_CART = exports.POST_CART = exports.GET_USER = exports.GET_PRODUCT = exports.GET_PRODUCTS = undefined;

var _SessionManager = require('./SessionManager');

var _SessionManager2 = _interopRequireDefault(_SessionManager);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _jquery = require('jquery/dist/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GET_PRODUCTS = exports.GET_PRODUCTS = "GET_PRODUCTS";
var GET_PRODUCT = exports.GET_PRODUCT = "GET_PRODUCT";
var GET_USER = exports.GET_USER = "GET_USER";
var POST_CART = exports.POST_CART = "POST_CART";
var GET_CART = exports.GET_CART = "GET_CART";
var PATCH_CART = exports.PATCH_CART = "PATCH_CART";
var DELETE_CART = exports.DELETE_CART = "DELETE_CART";
var GET_ADDRESS_FROM_API = exports.GET_ADDRESS_FROM_API = "GET_ADDRESS_FROM_API";
var GET_MY_ADDRESS_LIST = exports.GET_MY_ADDRESS_LIST = "GET_MY_ADDRESS_LIST";
var POST_ORDER = exports.POST_ORDER = "POST_ORDER";

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
  var request = _SessionManager2.default.instance().get('/products');

  return {
    type: GET_PRODUCTS,
    payload: request
  };
};

var getProduct = exports.getProduct = function getProduct(params) {
  var request = _SessionManager2.default.instance().get('/product', params);

  return {
    type: GET_PRODUCT,
    payload: request
  };
};

var getUser = exports.getUser = function getUser(params) {
  var request = _SessionManager2.default.instance().get('/user', params);

  return {
    type: GET_USER,
    payload: request
  };
};

var postCart = exports.postCart = function postCart(data) {
  var request = _SessionManager2.default.instance().post('/cart', data);

  return {
    type: POST_CART,
    payload: request
  };
};

var getCart = exports.getCart = function getCart(params) {
  var request = _SessionManager2.default.instance().get('/cart', params);

  return {
    type: GET_CART,
    payload: request
  };
};

var patchCart = exports.patchCart = function patchCart(data) {
  var request = _SessionManager2.default.instance().patch('/cart', data);

  return {
    type: PATCH_CART,
    payload: request
  };
};

var delCart = exports.delCart = function delCart(params) {
  var request = _SessionManager2.default.instance().del('/cart', params);

  return {
    type: DELETE_CART,
    payload: request
  };
};

var getAddressFromAPI = exports.getAddressFromAPI = function getAddressFromAPI(data) {
  var request = (0, _axios2.default)({
    method: "post",
    url: "http://www.juso.go.kr/addrlink/addrLinkApi.do",
    data: data
  });

  return {
    type: GET_ADDRESS_FROM_API,
    payload: request
  };
};

var getMyAddressList = exports.getMyAddressList = function getMyAddressList(params) {
  var request = _SessionManager2.default.instance().get('/address', params);

  return {
    type: GET_MY_ADDRESS_LIST,
    payload: request
  };
};

var postOrder = exports.postOrder = function postOrder(data) {
  var request = _SessionManager2.default.instance().post('/order', data);

  return {
    type: POST_ORDER,
    payload: request
  };
};

//# sourceMappingURL=RequestManager-compiled.js.map