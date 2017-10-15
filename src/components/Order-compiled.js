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

var _materialUi = require('material-ui');

var _Table = require('material-ui/Table');

var _RequestManager = require('../actions/RequestManager');

var _CircularProgress = require('./CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _jquery = require('jquery/dist/jquery.min');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Order = function (_Component) {
  _inherits(Order, _Component);

  function Order(props) {
    _classCallCheck(this, Order);

    var _this = _possibleConstructorReturn(this, (Order.__proto__ || Object.getPrototypeOf(Order)).call(this, props));

    _this.onAddressDialogOpen = function () {
      _this.setState({ addressDialogOpen: true });
    };

    _this.onAddressDialogClose = function () {
      _this.setState({ addressDialogOpen: false });
    };

    _this.onSearchAddress = function () {
      var data = new FormData();

      data.append("confmKey", "U01TX0FVVEgyMDE3MTAxNTIzMDgwNDEwNzQwNTA=");
      data.append("currentPage", "1");
      data.append("countPerPage", "10");
      data.append("keyword", _this.state.addressTerm);
      data.append("resultType", "json");

      _this.props.getAddress(data);
    };

    _this.state = {
      addressDialogOpen: false,
      addressTerm: ""
    };

    return _this;
  }

  _createClass(Order, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      setTimeout(function () {
        var params = {
          // userId: this.props.currentUser.id
          userId: 1
        };

        _this2.props.getCart(params).then(function (res) {
          var cart = res.payload.data.cart;


          _this2.setState({ cartItems: cart });
        });
      }, 200);
    }
  }, {
    key: 'onChangeAddress',
    value: function onChangeAddress(addressTerm) {
      this.setState({ addressTerm: addressTerm });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      console.log(this);

      // 여기서는 장바구니 내용 없다고 보여줘야해
      if (this.state.cartItems === undefined) return _react2.default.createElement(_CircularProgress2.default, null);

      var styles = {
        id: { width: "10%", textAlign: "center" },
        titleHeader: { width: "54%", textAlign: "center" },
        title: { width: "54%" },
        count: { width: "11%", textAlign: "center" },
        delete: { width: "11%", textAlign: "center" },
        price: { width: "12%", textAlign: "center" },
        totalPrice: { width: "12%", textAlign: "center" }
      };

      var renderOptions = function renderOptions(options) {
        return options.map(function (option, index) {
          return _react2.default.createElement(
            'p',
            { key: index },
            option.description
          );
        });
      };

      var renderCounts = function renderCounts(cartItem, index) {
        // option이 없는 단품일 경우
        if (cartItem.options.length === 0) {
          // return renderCount(cartItem.id, cartItem.product.count, index);
        } else {
          // option이 있는 제품일 경우
          return cartItem.options.map(function (option, optionIndex) {
            // return renderCount(option.cartId, option.count, index, optionIndex);
          });
        }
      };

      var renderEachPrice = function renderEachPrice(cartItem) {
        if (cartItem.options.length === 0) {
          return _react2.default.createElement(
            'p',
            null,
            cartItem.product.price_sale.toLocaleString(),
            '\uC6D0'
          );
        } else {
          return cartItem.options.map(function (option, index) {
            var marginTop = index === 0 ? 39 : 0;

            return _react2.default.createElement(
              'p',
              { key: index, style: { marginTop: marginTop } },
              option.additional_fee.toLocaleString(),
              '\uC6D0'
            );
          });
        }
      };

      var renderLinePrice = function renderLinePrice(cartItem) {
        var linePrice = 0;

        if (cartItem.options.length === 0) {
          linePrice = cartItem.product.count * cartItem.product.price_sale;
        } else {
          cartItem.options.forEach(function (option) {
            linePrice += option.additional_fee * option.count;
          });
        }
        return _react2.default.createElement(
          'h4',
          { style: { fontWeight: "bold", marginTop: 20 } },
          linePrice.toLocaleString(),
          '\uC6D0'
        );
      };

      var renderProductOptions = function renderProductOptions(cartItem) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h4',
            null,
            cartItem.product.name
          ),
          renderOptions(cartItem.options)
        );
      };

      var renderCartListOver = function renderCartListOver() {
        console.log(_this3.state.cartItems);
        return _this3.state.cartItems.map(function (cartItem, index) {
          var marginTop = cartItem.options.length === 0 ? 0 : 39;

          return _react2.default.createElement(
            _Table.TableRow,
            { key: index },
            _react2.default.createElement(
              _Table.TableRowColumn,
              { style: styles.title },
              _react2.default.createElement('img', {
                src: '../../assets/img/' + cartItem.product.image_path,
                className: 'inlineBlock alignCenter',
                style: { width: "50%" }
              }),
              _react2.default.createElement(
                'div',
                { style: { width: "50%", verticalAlign: "middle" }, className: 'inlineBlock' },
                renderProductOptions(cartItem)
              )
            ),
            _react2.default.createElement(
              _Table.TableRowColumn,
              { style: styles.count },
              _react2.default.createElement(
                'div',
                { style: { marginTop: marginTop } },
                renderCounts(cartItem, index)
              )
            ),
            _react2.default.createElement(
              _Table.TableRowColumn,
              { style: styles.price },
              renderEachPrice(cartItem)
            ),
            _react2.default.createElement(
              _Table.TableRowColumn,
              { style: styles.totalPrice },
              renderLinePrice(cartItem)
            )
          );
        });
      };

      var renderOptionsUnder = function renderOptionsUnder(cartItem, index) {
        if (cartItem.options.length === 0) {
          return _react2.default.createElement(
            'div',
            { className: 'clearfix py-2' },
            _react2.default.createElement(
              'div',
              { className: 'mb-2' },
              '\uAC1C\uB2F9 ',
              cartItem.product.price_sale.toLocaleString(),
              '\uC6D0'
            ),
            _react2.default.createElement('div', { style: { width: 70 }, className: 'pull-left alignCenter' })
          );
        } else {
          return cartItem.options.map(function (option, optionIndex) {
            return _react2.default.createElement(
              'div',
              { key: optionIndex, className: 'clearfix' },
              optionIndex > 0 ? _react2.default.createElement(_materialUi.Divider, null) : null,
              _react2.default.createElement(
                'div',
                { className: 'clearfix py-2' },
                _react2.default.createElement(
                  'div',
                  { className: 'mb-2' },
                  option.description,
                  ' / \uAC1C\uB2F9 ',
                  option.additional_fee.toLocaleString(),
                  '\uC6D0'
                ),
                _react2.default.createElement('div', { style: { width: 70 }, className: 'pull-left alignCenter' })
              )
            );
          });
        }
      };

      var renderCartListUnder = function renderCartListUnder() {
        return _this3.state.cartItems.map(function (cartItem, index) {
          return _react2.default.createElement(
            _Table.TableRow,
            { key: index },
            _react2.default.createElement(
              _Table.TableRowColumn,
              null,
              _react2.default.createElement('img', {
                // 여기서 이미지랑 제품명 클릭했을 때 해당 제품으로 이동할 수 있도록 링크 달아야해
                src: '../../assets/img/' + cartItem.product.image_path,
                className: 'inlineBlock alignCenter',
                style: { width: "50%" }
              }),
              _react2.default.createElement(
                'div',
                { style: { width: "50%", verticalAlign: "middle" }, className: 'inlineBlock' },
                _react2.default.createElement(
                  'h4',
                  null,
                  cartItem.product.name
                ),
                renderOptionsUnder(cartItem, index)
              )
            )
          );
        });
      };

      var renderCartListXs = function renderCartListXs() {
        return _this3.state.cartItems.map(function (cartItem, index) {
          return _react2.default.createElement(
            _Table.TableRow,
            { key: index },
            _react2.default.createElement(
              _Table.TableRowColumn,
              null,
              _react2.default.createElement(
                'h4',
                { style: { fontWeight: "bold" } },
                cartItem.product.name
              ),
              _react2.default.createElement('img', {
                // 여기서 이미지랑 제품명 클릭했을 때 해당 제품으로 이동할 수 있도록 링크 달아야해
                src: '../../assets/img/' + cartItem.product.image_path,
                className: 'alignCenter',
                style: { width: "100%" }
              }),
              _react2.default.createElement(
                'div',
                { style: { verticalAlign: "middle" } },
                renderOptionsUnder(cartItem, index)
              )
            )
          );
        });
      };

      var calcTotalPrice = function calcTotalPrice() {
        var totalPrice = 0;

        _this3.state.cartItems.forEach(function (cartItem) {
          if (cartItem.options.length === 0) {
            totalPrice += cartItem.product.count * cartItem.product.price_sale;
          } else {
            cartItem.options.forEach(function (option) {
              totalPrice += option.count * option.additional_fee;
            });
          }
        });

        return totalPrice.toLocaleString();
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
                { className: 'pull-right pb-2 visible-over-block' },
                _react2.default.createElement(
                  'h3',
                  { style: { fontWeight: "bold" } },
                  '\uCD1D \uC0C1\uD488 \uAE08\uC561 = ',
                  calcTotalPrice(),
                  '\uC6D0'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'pull-right pb-2 visible-under-flex' },
                _react2.default.createElement(
                  'h4',
                  { style: { fontWeight: "bold" } },
                  '\uCD1D \uC0C1\uD488 \uAE08\uC561 = ',
                  calcTotalPrice(),
                  '\uC6D0'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'pull-right pb-2 visible-small-flex' },
                _react2.default.createElement(
                  'h5',
                  { style: { fontWeight: "bold" } },
                  '\uCD1D \uC0C1\uD488 \uAE08\uC561 = ',
                  calcTotalPrice(),
                  '\uC6D0'
                )
              )
            )
          )
        );
      };

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'jumbotron alignCenter visible-sm-block visible-md-block visible-lg-block' },
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
          {
            className: 'visible-xs-block alignCenter',
            style: { backgroundColor: "#eee", paddingTop: 20, paddingBottom: 20 }
          },
          _react2.default.createElement(
            'h4',
            { style: { fontWeight: "bold" } },
            '\uC7A5\uBC14\uAD6C\uB2C8'
          ),
          _react2.default.createElement(
            'p',
            null,
            '\uC0C1\uD488\uBA85 \uBC0F \uC218\uB7C9\uC744 \uD655\uC778\uD574 \uC8FC\uC138\uC694.'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'container pb-4' },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'visible-over-block' },
              _react2.default.createElement(
                _Table.Table
                // selectable={true} multiSelectable={true} allRowsSelected={true}
                ,
                null,
                _react2.default.createElement(
                  _Table.TableHeader
                  //enableSelectAll={true}
                  ,
                  { displaySelectAll: false, adjustForCheckbox: false
                  },
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
                      '\uAC1C\uB2F9 \uD310\uB9E4\uAC00'
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
                  { displayRowCheckbox: false },
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
                null,
                _react2.default.createElement(
                  _Table.TableHeader,
                  { displaySelectAll: false, adjustForCheckbox: false },
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
                  { displayRowCheckbox: false },
                  renderCartListUnder()
                ),
                renderFooter()
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'visible-small-flex' },
              _react2.default.createElement(
                _Table.Table,
                null,
                _react2.default.createElement(
                  _Table.TableHeader,
                  { displaySelectAll: false, adjustForCheckbox: false },
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
                  { displayRowCheckbox: false },
                  renderCartListXs()
                ),
                renderFooter()
              )
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'h4',
              null,
              '\uC8FC\uBB38\uC790 \uC815\uBCF4'
            ),
            _react2.default.createElement(_materialUi.Divider, null),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_materialUi.TextField, {
                hintText: '',
                floatingLabelText: '\uBCF4\uB0B4\uB294 \uBD84',
                floatingLabelFixed: true
              })
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_materialUi.TextField, {
                hintText: '',
                floatingLabelText: '\uD734\uB300\uD3F0 (\'-\' \uC5C6\uC774 \uC22B\uC790\uB9CC \uC785\uB825)',
                floatingLabelFixed: true
              })
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_materialUi.TextField, {
                hintText: '',
                floatingLabelText: '\uC774\uBA54\uC77C',
                floatingLabelFixed: true
              })
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'h4',
              null,
              '\uBC30\uC1A1 \uC815\uBCF4'
            ),
            _react2.default.createElement(_materialUi.Divider, null),
            _react2.default.createElement(_materialUi.TextField, {
              id: 'address',
              floatingLabelText: '\uC8FC\uC18C',
              floatingLabelFixed: true
            }),
            _react2.default.createElement(_materialUi.RaisedButton, {
              label: '\uC6B0\uD3B8\uBC88\uD638 \uCC3E\uAE30',
              primary: true
              // onTouchTap={this.onAddressDialogOpen}
              , onTouchTap: this.onSearchAddress
            }),
            _react2.default.createElement(
              _materialUi.Dialog,
              {
                title: '\uC8FC\uC18C\uAC80\uC0C9',
                modal: false,
                open: this.state.addressDialogOpen,
                onRequestClose: this.onAddressDialogClose
              },
              _react2.default.createElement(_materialUi.TextField, {
                floatingLabelText: '\uC8FC\uC18C \uC785\uB825',
                floatingLabelFixed: true,
                hintText: '\uAC80\uC0C9\uC5B4 \uC608 : \uB3C4\uB85C\uBA85(\uBC18\uD3EC\uB300\uB85C 58), \uAC74\uBB3C\uBA85(\uB3C5\uB9BD\uAE30\uB150\uAD00), \uC9C0\uBC88(\uC0BC\uC131\uB3D9 25)',
                fullWidth: true,
                value: this.state.addressTerm,
                onChange: function onChange(event) {
                  return _this3.onChangeAddress(event.target.value);
                }
              }),
              _react2.default.createElement(_materialUi.RaisedButton, {
                label: 'Search',
                primary: true,
                onTouchTap: this.onSearchAddress
              })
            )
          )
        )
      );
    }
  }]);

  return Order;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.single
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    getCart: _RequestManager.getCart,
    getAddress: _RequestManager.getAddress
  }, dispatch);
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Order);

//# sourceMappingURL=Order-compiled.js.map