'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Card = require('material-ui/Card');

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProductThumbnail = function (_Component) {
  _inherits(ProductThumbnail, _Component);

  function ProductThumbnail(props) {
    _classCallCheck(this, ProductThumbnail);

    var _this = _possibleConstructorReturn(this, (ProductThumbnail.__proto__ || Object.getPrototypeOf(ProductThumbnail)).call(this, props));

    _this.state = { opacity: 1 };
    return _this;
  }

  _createClass(ProductThumbnail, [{
    key: 'onMouseOver',
    value: function onMouseOver() {
      this.setState({ opacity: 0.4 });
    }
  }, {
    key: 'onMouseOut',
    value: function onMouseOut() {
      this.setState({ opacity: 1 });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = {
        imgStyle: {
          opacity: this.state.opacity
        }
      };

      var product = this.props.product;


      return _react2.default.createElement(
        _reactRouterDom.Link,
        { to: '/product/' + product.id },
        _react2.default.createElement(
          'div',
          {
            className: 'my-2 col-md-4 col-sm-6 cursorPointer',
            onMouseOver: this.onMouseOver.bind(this),
            onMouseOut: this.onMouseOut.bind(this),
            style: styles.imgStyle
          },
          _react2.default.createElement(
            _Card.CardMedia,
            null,
            _react2.default.createElement('img', { src: '/assets/img/' + product.image_path, alt: '' })
          ),
          _react2.default.createElement(_Card.CardTitle, { style: { textAlign: 'center' }, title: product.name, subtitle: product.price_sale + '\uC6D0' })
        )
      );
    }
  }]);

  return ProductThumbnail;
}(_react.Component);

exports.default = ProductThumbnail;

//# sourceMappingURL=ProductThumbnail-compiled.js.map