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

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _reduxPromise = require('redux-promise');

var _reduxPromise2 = _interopRequireDefault(_reduxPromise);

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _Header = require('./containers/Header');

var _Header2 = _interopRequireDefault(_Header);

var _index = require('./containers/Home/index');

var _index2 = _interopRequireDefault(_index);

var _Footer = require('./containers/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Shop = require('./containers/Shop');

var _Shop2 = _interopRequireDefault(_Shop);

var _Admin = require('./containers/Admin');

var _Admin2 = _interopRequireDefault(_Admin);

var _Item = require('./components/Item');

var _Item2 = _interopRequireDefault(_Item);

var _Products = require('./components/Products');

var _Products2 = _interopRequireDefault(_Products);

var _SignIn = require('./components/SignIn');

var _SignIn2 = _interopRequireDefault(_SignIn);

var _SignUp = require('./components/SignUp');

var _SignUp2 = _interopRequireDefault(_SignUp);

var _ProductDetail = require('./components/ProductDetail');

var _ProductDetail2 = _interopRequireDefault(_ProductDetail);

var _Cart = require('./components/Cart');

var _Cart2 = _interopRequireDefault(_Cart);

var _Order = require('./components/Order');

var _Order2 = _interopRequireDefault(_Order);

var _Payment = require('./components/Payment');

var _Payment2 = _interopRequireDefault(_Payment);

var _MyPage = require('./components/MyPage');

var _MyPage2 = _interopRequireDefault(_MyPage);

var _AdminEditProduct = require('./components/Admin/AdminEditProduct');

var _AdminEditProduct2 = _interopRequireDefault(_AdminEditProduct);

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
      { muiTheme: (0, _getMuiTheme2.default)() },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_reactRouter.Route, { path: '*', component: _Header2.default })
        ),
        _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/', component: _index2.default }),
        _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/shop/:productId', component: _Item2.default }),
        _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/shop', component: _Shop2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/product/:productId', component: _ProductDetail2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/products', component: _Products2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/signin', component: _SignIn2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/signup', component: _SignUp2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/cart', component: _Cart2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/order', component: _Order2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/payment', component: _Payment2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/myPage', component: _MyPage2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/admin', component: _Admin2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/admin/products/edit/:productId', component: _AdminEditProduct2.default }),
        _react2.default.createElement(_Footer2.default, null)
      )
    )
  )
), document.querySelector('#main'));

//# sourceMappingURL=index-compiled.js.map