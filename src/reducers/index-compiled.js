'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _ReducerCurrent = require('./ReducerCurrent');

var _ReducerCurrent2 = _interopRequireDefault(_ReducerCurrent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  current: _ReducerCurrent2.default
});

exports.default = rootReducer;

//# sourceMappingURL=index-compiled.js.map