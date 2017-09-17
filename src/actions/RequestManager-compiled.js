"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProduct = exports.getProducts = exports.GET_PRODUCT = exports.GET_PRODUCTS = undefined;

var _SessionManager = require("./SessionManager");

var _SessionManager2 = _interopRequireDefault(_SessionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GET_PRODUCTS = exports.GET_PRODUCTS = "GET_PRODUCTS";
var GET_PRODUCT = exports.GET_PRODUCT = "GET_PRODUCT";

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

var getProduct = exports.getProduct = function getProduct(productID) {
  var request = _SessionManager2.default.instance().get("/product", productID);

  return {
    type: GET_PRODUCT,
    payload: request
  };
};

//# sourceMappingURL=RequestManager-compiled.js.map