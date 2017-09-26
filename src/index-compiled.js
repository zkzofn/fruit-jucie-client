'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reactRouter = require('react-router');

var _history = require('history');

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _reduxPromise = require('redux-promise');

var _reduxPromise2 = _interopRequireDefault(_reduxPromise);

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _Header = require('./containers/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Home = require('./containers/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Footer = require('./containers/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Products = require('./components/Products');

var _Products2 = _interopRequireDefault(_Products);

var _SignIn = require('./components/SignIn');

var _SignIn2 = _interopRequireDefault(_SignIn);

var _ProductDetail = require('./components/ProductDetail');

var _ProductDetail2 = _interopRequireDefault(_ProductDetail);

var _Cart = require('./components/Cart');

var _Cart2 = _interopRequireDefault(_Cart);

var _Payment = require('./components/Payment');

var _Payment2 = _interopRequireDefault(_Payment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactTapEventPlugin2.default)();

var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxPromise2.default)(_redux.createStore);

var customHistory = (0, _history.createBrowserHistory)();

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: createStoreWithMiddleware(_reducers2.default) },
  _react2.default.createElement(
    _reactRouter.Router,
    { history: customHistory },
    _react2.default.createElement(
      _MuiThemeProvider2.default,
      null,
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reactRouter.Route, { path: '*', component: _Header2.default }),
        _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/', component: _Home2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/product/:productId', component: _ProductDetail2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/products', component: _Products2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/signin', component: _SignIn2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/cart', component: _Cart2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/payment', component: _Payment2.default }),
        _react2.default.createElement(_Footer2.default, null)
      )
    )
  )
), document.querySelector('#main'));

//# sourceMappingURL=index-compiled.js.map