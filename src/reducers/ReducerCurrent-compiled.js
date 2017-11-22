'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];

  switch (action.type) {
    case _RequestManager.POST_LOGIN:
      if (action.payload.data.status === 200) return _extends({}, state, { user: action.payload.data.user, status: action.payload.data.status });else if (action.payload.data.status === 404) return _extends({}, state, { status: action.payload.data.status, msg: action.payload.data.msg });else return _extends({}, state);

    case _RequestManager.GET_VALIDATE:
      if (action.payload.data.result) return _extends({}, state);else return _extends({}, state, { user: null });
  }
  return state;
};

var _RequestManager = require('../actions/RequestManager');

// import { GET_VALIDATE } from '../actions/RequestManager';
//
// const INITIAL_STATE = { isLogin: null };
//
// export default function (state = INITIAL_STATE, action) {
//   switch (action.type) {
//     case GET_VALIDATE:
//       return { ...state, isLogin: action.payload.data.result };
//   }
//   return state;
// }
var INITIAL_STATE = { user: null, status: null, msg: null };

//# sourceMappingURL=ReducerCurrent-compiled.js.map