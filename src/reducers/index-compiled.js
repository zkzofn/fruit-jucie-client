'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _ReducerUser = require('./ReducerUser');

var _ReducerUser2 = _interopRequireDefault(_ReducerUser);

var _ReducerValidate = require('./ReducerValidate');

var _ReducerValidate2 = _interopRequireDefault(_ReducerValidate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  user: _ReducerUser2.default,
  validate: _ReducerValidate2.default
});

exports.default = rootReducer;

//# sourceMappingURL=index-compiled.js.map