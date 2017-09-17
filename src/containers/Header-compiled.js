'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _materialUi = require('material-ui');

var _powerSettingsNew = require('material-ui/svg-icons/action/power-settings-new');

var _powerSettingsNew2 = _interopRequireDefault(_powerSettingsNew);

var _shoppingCart = require('material-ui/svg-icons/action/shopping-cart');

var _shoppingCart2 = _interopRequireDefault(_shoppingCart);

var _HeaderTop = require('../components/HeaderTop');

var _HeaderTop2 = _interopRequireDefault(_HeaderTop);

var _HeaderLogo = require('../components/HeaderLogo');

var _HeaderLogo2 = _interopRequireDefault(_HeaderLogo);

var _HeaderNav = require('../components/HeaderNav');

var _HeaderNav2 = _interopRequireDefault(_HeaderNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

    _this.state = {
      open: false
    };
    return _this;
  }

  _createClass(Header, [{
    key: 'openDrawer',
    value: function openDrawer() {
      this.setState({ open: true });
    }
  }, {
    key: 'closeDrawer',
    value: function closeDrawer() {
      this.setState({ open: false });
    }
  }, {
    key: 'titleTouch',
    value: function titleTouch() {
      this.context.router.history.push("/");
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // const headerStyle = {
      //   position: 'relative',
      //   width: '100%',
      //   height: 'auto',
      //   backgroundColor: '#fff',
      //   margin: '0 auto',
      //   overflow: 'hidden'
      // };

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_materialUi.AppBar, {
          className: 'visible-under-flex',
          title: _react2.default.createElement(
            'span',
            { className: 'cursorPointer' },
            'Eat More'
          ),
          onTitleTouchTap: this.titleTouch.bind(this),
          onLeftIconButtonTouchTap: this.openDrawer.bind(this)
        }),
        _react2.default.createElement(
          _materialUi.Drawer,
          {
            open: this.state.open,
            docked: false,
            onRequestChange: function onRequestChange(open) {
              return _this2.setState({ open: open });
            }
          },
          _react2.default.createElement(
            _materialUi.MenuItem,
            { href: '/signin' },
            _react2.default.createElement(_powerSettingsNew2.default, null),
            'Sign In'
          ),
          _react2.default.createElement(
            _materialUi.MenuItem,
            null,
            _react2.default.createElement(_shoppingCart2.default, null),
            '\uC7A5\uBC14\uAD6C\uB2C8'
          ),
          _react2.default.createElement(_materialUi.Divider, null),
          _react2.default.createElement(
            _materialUi.MenuItem,
            { href: '/products', onTouchTap: this.closeDrawer.bind(this) },
            'Green'
          ),
          _react2.default.createElement(
            _materialUi.MenuItem,
            { disabled: true },
            'Soup'
          ),
          _react2.default.createElement(
            _materialUi.MenuItem,
            { disabled: true },
            'Salad'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'visible-over-block container' },
          _react2.default.createElement(_HeaderTop2.default, null),
          _react2.default.createElement(_HeaderLogo2.default, null),
          _react2.default.createElement(_HeaderNav2.default, null)
        )
      );
    }
  }]);

  return Header;
}(_react.Component);

Header.contextTypes = {
  router: _propTypes.PropTypes.object
};
exports.default = Header;

//# sourceMappingURL=Header-compiled.js.map