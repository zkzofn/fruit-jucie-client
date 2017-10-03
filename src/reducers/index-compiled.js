'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _ReducerCurrentUser = require('./ReducerCurrentUser');

var _ReducerCurrentUser2 = _interopRequireDefault(_ReducerCurrentUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  currentUser: _ReducerCurrentUser2.default
});

exports.default = rootReducer;

//# sourceMappingURL=index-compiled.js.map