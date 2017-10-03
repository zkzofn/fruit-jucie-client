'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _Table = require('material-ui/Table');

var _RequestManager = require('../actions/RequestManager');

var _CircularProgress = require('./CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cart = function (_Component) {
  _inherits(Cart, _Component);

  function Cart(props) {
    _classCallCheck(this, Cart);

    var _this = _possibleConstructorReturn(this, (Cart.__proto__ || Object.getPrototypeOf(Cart)).call(this, props));

    _this.state = {
      cartItems: []
    };
    return _this;
  }

  // 장바구니에서 구매페이지로 넘어갈 때 재고도 한번 확인하고 넘어가

  _createClass(Cart, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      // 여기서 setTimeout을 주는 이유는 매번
      setTimeout(function () {
        var params = {
          userId: _this2.props.currentUser.id
        };

        _this2.props.getCart(params).then(function (res) {
          var cart = res.payload.data.cart;


          console.log(cart);

          _this2.setState({ cart: cart });
        });
      }, 200);

      this.setState({
        cartItems: [{ id: 1, title: "짤깃한 고구마", options: ["짤깃한맛", "고소한맛"], price: 5800, count: 5 }, { id: 2, title: "짤깃한 고구마", options: ["매운맛", "고소한맛"], price: 5800, count: 5 }, { id: 3, title: "짤깃한 고구마", options: ["단맛"], price: 5800, count: 15 }]
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.state.cart === undefined) return _react2.default.createElement(_CircularProgress2.default, null);

      var styles = {
        id: { width: "10%", textAlign: "center" },
        titleHeader: { width: "54%", textAlign: "center" },
        title: { width: "54%" },
        count: { width: "11%", textAlign: "center" },
        price: { width: "12%", textAlign: "center" },
        totalPrice: { width: "12%", textAlign: "center" }
      };

      var renderOptions = function renderOptions(options) {
        return options.map(function (option, index) {
          return _react2.default.createElement(
            'p',
            { key: index },
            option
          );
        });
      };

      var minusProductCount = function minusProductCount(event, index) {
        event.stopPropagation();

        _this3.setState({
          cartItems: (0, _reactAddonsUpdate2.default)(_this3.state.cartItems, _defineProperty({}, index, {
            count: {
              $set: _this3.state.cartItems[index].count > 1 ? _this3.state.cartItems[index].count - 1 : 1
            }
          }))
        });
      };

      var plusProductCount = function plusProductCount(event, index) {
        event.stopPropagation();

        _this3.setState({
          cartItems: (0, _reactAddonsUpdate2.default)(_this3.state.cartItems, _defineProperty({}, index, {
            count: {
              $set: _this3.state.cartItems[index].count + 1
            }
          }))
        });
      };

      var calcTotalPrice = function calcTotalPrice() {
        var totalPrice = 0;

        for (var i = 0; i < _this3.state.cartItems.length; i++) {
          totalPrice += _this3.state.cartItems[i].price * _this3.state.cartItems[i].count;
        }

        return totalPrice.toLocaleString();
      };

      var renderCartListOver = function renderCartListOver() {
        return _this3.state.cartItems.map(function (cartItem, index) {
          return _react2.default.createElement(
            _Table.TableRow,
            { key: index },
            _react2.default.createElement(
              _Table.TableRowColumn,
              { style: styles.title },
              _react2.default.createElement('img', {
                src: '../../assets/img/sweet_potato.jpg',
                className: 'inlineBlock alignCenter',
                style: { width: "50%" }
              }),
              _react2.default.createElement(
                'div',
                { style: { width: "50%", verticalAlign: "middle" }, className: 'inlineBlock' },
                _react2.default.createElement(
                  'h4',
                  null,
                  cartItem.title
                ),
                renderOptions(cartItem.options)
              )
            ),
            _react2.default.createElement(
              _Table.TableRowColumn,
              { style: styles.count },
              _react2.default.createElement(
                'div',
                { className: 'boxed-group', role: 'group', 'aria-label': 'Product count', style: { height: 30 } },
                _react2.default.createElement(
                  'div',
                  {
                    style: { width: "33.3333333%", verticalAlign: "middle" },
                    className: 'inlineBlock cursorPointer',
                    onClick: function onClick(event) {
                      return minusProductCount(event, index);
                    }
                  },
                  '-'
                ),
                _react2.default.createElement(
                  'div',
                  { style: { width: "33.3333333%", verticalAlign: "middle", height: "100%", paddingTop: 4 }, className: 'inlineBlock productCount' },
                  cartItem.count
                ),
                _react2.default.createElement(
                  'div',
                  {
                    style: { width: "33.3333333%", verticalAlign: "middle" },
                    className: 'inlineBlock cursorPointer',
                    onClick: function onClick(event) {
                      return plusProductCount(event, index);
                    }
                  },
                  '+'
                )
              )
            ),
            _react2.default.createElement(
              _Table.TableRowColumn,
              { style: styles.price },
              cartItem.price.toLocaleString(),
              '\uC6D0'
            ),
            _react2.default.createElement(
              _Table.TableRowColumn,
              { style: styles.totalPrice },
              (cartItem.count * cartItem.price).toLocaleString(),
              '\uC6D0'
            )
          );
        });
      };

      var renderCartListUnder = function renderCartListUnder() {
        return _this3.state.cartItems.map(function (cartItem, index) {
          return _react2.default.createElement(
            _Table.TableRow,
            { key: index },
            _react2.default.createElement(
              _Table.TableRowColumn,
              { style: { width: "70%" } },
              _react2.default.createElement('img', {
                src: '../../assets/img/sweet_potato.jpg',
                className: 'inlineBlock alignCenter',
                style: { width: "50%" }
              }),
              _react2.default.createElement(
                'div',
                { style: { width: "50%", verticalAlign: "middle" }, className: 'inlineBlock' },
                _react2.default.createElement(
                  'div',
                  { style: { width: "60%" }, className: 'inlineBlock' },
                  _react2.default.createElement(
                    'h4',
                    null,
                    cartItem.title
                  ),
                  renderOptions(cartItem.options),
                  _react2.default.createElement(
                    'div',
                    { className: 'boxed-group alignCenter', role: 'group', 'aria-label': 'Product count', style: { width: "70%", height: 30 } },
                    _react2.default.createElement(
                      'div',
                      {
                        style: { width: "33.3333333%" },
                        className: 'inlineBlock cursorPointer',
                        onClick: function onClick(event) {
                          return minusProductCount(event, index);
                        }
                      },
                      '-'
                    ),
                    _react2.default.createElement(
                      'div',
                      { style: { width: "33.3333333%", height: "100%", paddingTop: 4 }, className: 'inlineBlock productCount' },
                      cartItem.count
                    ),
                    _react2.default.createElement(
                      'div',
                      {
                        style: { width: "33.3333333%" },
                        className: 'inlineBlock cursorPointer',
                        onClick: function onClick(event) {
                          return plusProductCount(event, index);
                        }
                      },
                      '+'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    null,
                    '\uAC1C\uB2F9 \uD310\uB9E4\uAC00 ',
                    cartItem.price.toLocaleString(),
                    '\uC6D0'
                  )
                )
              )
            ),
            _react2.default.createElement(
              _Table.TableRowColumn,
              { style: { width: "30%" } },
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'h3',
                  null,
                  (cartItem.count * cartItem.price).toLocaleString(),
                  '\uC6D0'
                )
              )
            )
          );
        });
      };

      var renderFooter = function renderFooter() {
        return _react2.default.createElement(
          _Table.TableFooter,
          null,
          _react2.default.createElement(
            _Table.TableRow,
            null,
            _react2.default.createElement(
              _Table.TableRowColumn,
              null,
              _react2.default.createElement(
                'div',
                { className: 'pull-right pb-2' },
                _react2.default.createElement(
                  'h3',
                  null,
                  '\uCD1D \uC0BC\uD488 \uAE08\uC561 = ',
                  calcTotalPrice(),
                  '\uC6D0'
                )
              )
            )
          ),
          _react2.default.createElement(
            _Table.TableRow,
            null,
            _react2.default.createElement(
              _Table.TableRowColumn,
              null,
              _react2.default.createElement(
                'div',
                { className: 'pull-right' },
                _react2.default.createElement(
                  'button',
                  { className: 'btn mr-2' },
                  '\uC120\uD0DD\uC0C1\uD488\uC0AD\uC81C'
                ),
                _react2.default.createElement(
                  'button',
                  { className: 'btn mr-2' },
                  '\uC120\uD0DD\uC0C1\uD488\uC8FC\uBB38'
                ),
                _react2.default.createElement(
                  'button',
                  { className: 'btn btn-primary' },
                  '\uC804\uCCB4\uC0C1\uD488\uC8FC\uBB38'
                )
              )
            )
          )
        );
      };

      // 여기 큰화면이랑 작은화면일때 코드 분할시켜놔

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'jumbotron alignCenter' },
          _react2.default.createElement(
            'h1',
            null,
            '\uC7A5\uBC14\uAD6C\uB2C8'
          ),
          _react2.default.createElement(
            'p',
            null,
            '\uC8FC\uBB38\uD558\uC2E4 \uC0C1\uD488\uBA85 \uBC0F \uC218\uB7C9\uC744 \uC815\uD655\uD558\uAC8C \uD655\uC778\uD574 \uC8FC\uC138\uC694.'
          ),
          _react2.default.createElement(
            'p',
            null,
            '\uC7A5\uBC14\uAD6C\uB2C8\uC5D0 \uB2F4\uC740 \uC0C1\uD488\uC740 \uC77C\uC8FC\uC77C \uD6C4 \uC790\uB3D9 \uC0AD\uC81C\uB429\uB2C8\uB2E4.'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'container pb-4' },
          _react2.default.createElement(
            'div',
            { className: 'visible-over-block' },
            _react2.default.createElement(
              _Table.Table,
              { selectable: true, multiSelectable: true, allRowsSelected: true },
              _react2.default.createElement(
                _Table.TableHeader,
                { enableSelectAll: true },
                _react2.default.createElement(
                  _Table.TableRow,
                  null,
                  _react2.default.createElement(
                    _Table.TableHeaderColumn,
                    { style: styles.titleHeader },
                    '\uC0C1\uD488\uC815\uBCF4'
                  ),
                  _react2.default.createElement(
                    _Table.TableHeaderColumn,
                    { style: styles.count },
                    '\uC218\uB7C9'
                  ),
                  _react2.default.createElement(
                    _Table.TableHeaderColumn,
                    { style: styles.price },
                    '\uD310\uB9E4\uAC00'
                  ),
                  _react2.default.createElement(
                    _Table.TableHeaderColumn,
                    { style: styles.totalPrice },
                    '\uAE08\uC561'
                  )
                )
              ),
              _react2.default.createElement(
                _Table.TableBody,
                { showRowHover: true },
                renderCartListOver()
              ),
              renderFooter()
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'visible-under-flex' },
            _react2.default.createElement(
              _Table.Table,
              { selectable: true, multiSelectable: true, allRowsSelected: true },
              _react2.default.createElement(
                _Table.TableHeader,
                { enableSelectAll: true },
                _react2.default.createElement(
                  _Table.TableRow,
                  null,
                  _react2.default.createElement(
                    _Table.TableHeaderColumn,
                    { className: 'alignCenter' },
                    '\uC0C1\uD488\uC815\uBCF4'
                  )
                )
              ),
              _react2.default.createElement(
                _Table.TableBody,
                null,
                renderCartListUnder()
              ),
              renderFooter()
            )
          )
        )
      );
    }
  }]);

  return Cart;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.single
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    getCart: _RequestManager.getCart
  }, dispatch);
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Cart);

//# sourceMappingURL=Cart-compiled.js.map