'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _RequestManager = require('../actions/RequestManager');

var _materialUi = require('material-ui');

var _addShoppingCart = require('material-ui/svg-icons/action/add-shopping-cart');

var _addShoppingCart2 = _interopRequireDefault(_addShoppingCart);

var _creditCard = require('material-ui/svg-icons/action/credit-card');

var _creditCard2 = _interopRequireDefault(_creditCard);

var _close = require('material-ui/svg-icons/navigation/close');

var _close2 = _interopRequireDefault(_close);

var _reactScroll = require('react-scroll');

var _Table = require('material-ui/Table');

var _CircularProgress = require('./CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProductDetail = function (_Component) {
  _inherits(ProductDetail, _Component);

  function ProductDetail(props) {
    _classCallCheck(this, ProductDetail);

    var _this = _possibleConstructorReturn(this, (ProductDetail.__proto__ || Object.getPrototypeOf(ProductDetail)).call(this, props));

    _this.onOpenAlertDialog = function () {
      _this.setState({ alertDialogOpen: true });
    };

    _this.onCloseCartDialog = function () {
      _this.setState({
        cartDialogOpen: false,
        alertDialogOpen: false
      });
    };

    _this.state = {
      openOption: false,
      selectedOptions: [],
      styles: {
        id: { width: "10%", textAlign: "center" },
        titleHeader: { width: "60%", textAlign: "center" },
        title: { width: "60%" },
        userName: { width: "10%", textAlign: "center" },
        date: { width: "12%", textAlign: "center" },
        star: { width: "8%", textAlign: "center" }
      },
      cartDialogOpen: false,
      alertDialogOpen: false,
      alertText: ""
    };
    return _this;
  }

  _createClass(ProductDetail, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var params = {
        productId: this.props.match.params.productId
      };

      this.props.getProduct(params).then(function (res) {
        var product = res.payload.data.product;

        product.count = 1;
        _this2.setState({ product: product });
      });
    }
  }, {
    key: 'onOptionTap',
    value: function onOptionTap(event) {
      event.preventDefault();

      this.setState({
        openOption: true,
        anchorEl: event.currentTarget
      });
    }
  }, {
    key: 'onOptionClose',
    value: function onOptionClose() {
      this.setState({ openOption: false });
    }
  }, {
    key: 'onSelectOption',
    value: function onSelectOption(option) {
      var selectedOption = option;

      selectedOption.count = 1;

      var checkSelectedOptions = this.state.selectedOptions.filter(function (selectedOption) {
        return selectedOption.id === option.id;
      });

      if (checkSelectedOptions.length === 0) {
        this.setState({
          openOption: false,
          selectedOptions: [].concat(_toConsumableArray(this.state.selectedOptions), [selectedOption])
        });
      } else {
        this.setState({
          openOption: false,
          alertText: "이미 선택된 옵션입니다.",
          alertDialogOpen: true
        });
      }
    }
  }, {
    key: 'renderOptionsOrCount',
    value: function renderOptionsOrCount() {
      var _this3 = this;

      var product = this.state.product;
      var options = this.state.product.options;


      var minusProductCount = function minusProductCount(event) {
        event.stopPropagation();

        product.count -= 1;
        _this3.setState({ product: product });
      };

      var plusProductCount = function plusProductCount(event) {
        event.stopPropagation();

        product.count += 1;
        _this3.setState({ product: product });
      };

      var renderOptions = options.map(function (option, index) {
        return _react2.default.createElement(_materialUi.MenuItem, {
          key: index,
          value: index,
          primaryText: option.description + ' - ' + option.additional_fee.toLocaleString() + '\uC6D0',
          onTouchTap: _this3.onSelectOption.bind(_this3, option)
        });
      });

      if (options.length == 0) {
        return _react2.default.createElement(
          'div',
          { className: 'py-4' },
          _react2.default.createElement(
            'span',
            null,
            '\uAD6C\uB9E4\uC218\uB7C9'
          ),
          _react2.default.createElement(
            'div',
            {
              style: { width: 90 },
              className: 'boxed-group inlineBlock pull-right',
              role: 'group',
              'aria-label': 'Product count'
            },
            _react2.default.createElement(
              'div',
              {
                style: { width: "33.33333333%" },
                className: 'inlineBlock cursorPointer alignCenter',
                onClick: function onClick(event) {
                  return minusProductCount(event);
                }
              },
              '-'
            ),
            _react2.default.createElement(
              'div',
              {
                style: { width: "33.3333333%" },
                className: 'inlineBlock productCount alignCenter'
              },
              product.count.toLocaleString()
            ),
            _react2.default.createElement(
              'div',
              {
                style: { width: "33.3333333%" },
                className: 'inlineBlock cursorPointer alignCenter',
                onClick: function onClick(event) {
                  return plusProductCount(event);
                }
              },
              '+'
            )
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'py-4' },
          _react2.default.createElement(
            'span',
            null,
            '\uC635\uC158'
          ),
          _react2.default.createElement(_materialUi.RaisedButton, {
            onClick: this.onOptionTap.bind(this),
            className: 'pull-right',
            label: '\uC635\uC158 \uC120\uD0DD'
          }),
          _react2.default.createElement(
            _materialUi.Popover,
            {
              open: this.state.openOption,
              anchorEl: this.state.anchorEl,
              anchorOrigin: { horizontal: "right", vertical: "bottom" },
              targetOrigin: { horizontal: "right", vertical: "top" },
              onRequestClose: this.onOptionClose.bind(this)
            },
            _react2.default.createElement(
              _materialUi.Menu,
              null,
              renderOptions
            )
          )
        );
      }
    }
  }, {
    key: 'renderSelectedOptions',
    value: function renderSelectedOptions() {
      var _this4 = this;

      var styles = {
        optionName: {
          width: "40%",
          float: "left"
        },
        count: {
          float: "left",
          textAlign: "center",
          width: "20%",
          marginLeft: 30
        },
        price: {
          textAlign: "right",
          width: "20%",
          float: "left"
        },
        close: {
          float: "right",
          width: "10%"
        }
      };

      var minusOptionCount = function minusOptionCount(event, index) {
        event.stopPropagation();

        _this4.setState({
          selectedOptions: (0, _reactAddonsUpdate2.default)(_this4.state.selectedOptions, _defineProperty({}, index, { count: { $set: _this4.state.selectedOptions[index].count > 1 ? _this4.state.selectedOptions[index].count - 1 : 1 } }))
        });
      };

      var plusOptionCount = function plusOptionCount(event, index) {
        event.stopPropagation();

        _this4.setState({
          selectedOptions: (0, _reactAddonsUpdate2.default)(_this4.state.selectedOptions, _defineProperty({}, index, { count: { $set: _this4.state.selectedOptions[index].count + 1 } }))
        });
      };

      var onDeleteSelectedOption = function onDeleteSelectedOption(index) {
        _this4.setState({
          selectedOptions: (0, _reactAddonsUpdate2.default)(_this4.state.selectedOptions, { $splice: [[index, 1]] })
        });
      };

      var renderSelectedOption = this.state.selectedOptions.map(function (option, index) {
        return _react2.default.createElement(
          'div',
          { key: index, className: 'py-2 clearfix' },
          _react2.default.createElement(
            'div',
            { style: styles.optionName },
            option.description
          ),
          _react2.default.createElement(
            'div',
            { style: styles.count, className: 'inlineBlock' },
            _react2.default.createElement(
              'div',
              { className: 'boxed-group', role: 'group', 'aria-label': 'Product count' },
              _react2.default.createElement(
                'div',
                {
                  style: { width: "33.33333333%", verticalAlign: "middle" },
                  className: 'inlineBlock cursorPointer',
                  onClick: function onClick(event) {
                    return minusOptionCount(event, index);
                  }
                },
                '-'
              ),
              _react2.default.createElement(
                'div',
                {
                  style: { width: "33.3333333%", height: "100%", paddingTop: 4 },
                  className: 'inlineBlock productCount'
                },
                option.count.toLocaleString()
              ),
              _react2.default.createElement(
                'div',
                {
                  style: { width: "33.3333333%" },
                  className: 'inlineBlock cursorPointer',
                  onClick: function onClick(event) {
                    return plusOptionCount(event, index);
                  }
                },
                '+'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { style: styles.price, className: 'inlineBlock' },
            (option.additional_fee * option.count).toLocaleString() + '\uC6D0'
          ),
          _react2.default.createElement(
            'div',
            { className: 'inlineBlock pull-right cursorPointer' },
            _react2.default.createElement(_close2.default, {
              onTouchTap: function onTouchTap() {
                return onDeleteSelectedOption(index);
              }
            })
          )
        );
      });

      if (this.state.selectedOptions.length > 0) return _react2.default.createElement(
        'div',
        { className: 'selectedProductsTable clearfix my-4' },
        renderSelectedOption
      );
    }
  }, {
    key: 'renderTotalPrice',
    value: function renderTotalPrice() {
      var totalPrice = 0;
      var totalCount = 0;
      var _state = this.state,
          selectedOptions = _state.selectedOptions,
          product = _state.product;


      if (product.options.length > 0) {
        if (selectedOptions.length > 0) {
          for (var i = 0; i < selectedOptions.length; i++) {
            totalPrice += selectedOptions[i].additional_fee * selectedOptions[i].count;
            totalCount += selectedOptions[i].count;
          }
        }
      } else {
        totalPrice = product.price_sale * product.count;
        totalCount = product.count;
      }

      return _react2.default.createElement(
        'div',
        {
          style: { fontWeight: "bold", fontSize: 20 },
          className: 'py-2'
        },
        '\uCD1D \uC0C1\uD488\uAE08\uC561: ' + totalPrice.toLocaleString() + '\uC6D0 (' + totalCount + ' \uAC1C)'
      );
    }
  }, {
    key: 'renderTabBar',
    value: function renderTabBar(sequence) {
      var tabBars = [{ name: "상품설명", link: "productDescription" }, { name: "상품정보", link: "productInformation" }, { name: "상품후기", link: "productPostScript" }];

      var renderTabItem = function renderTabItem() {
        return tabBars.map(function (tabBar, index) {
          return _react2.default.createElement(
            _reactScroll.Link,
            {
              key: index,
              to: tabBar.link,
              smooth: true,
              duration: 500,
              className: sequence == index ? "detailTabElement detailTabBorder detailSelectedTab" : "detailTabElement detailTabBorder"
            },
            _react2.default.createElement(
              'li',
              {
                className: sequence == index ? "detailTabElement" : "detailTabElement"
              },
              tabBar.name
            )
          );
        });
      };

      return _react2.default.createElement(
        'ul',
        { className: 'detailTab sticky' },
        renderTabItem()
      );
    }
  }, {
    key: 'onTouchCart',
    value: function onTouchCart() {
      var postCartBody = {
        userId: this.props.currentUser.id,
        product: this.state.product,
        selectedOptions: this.state.selectedOptions
      };

      if (this.state.product.options.length > 0 && this.state.selectedOptions.length === 0) {
        this.setState({ alertText: "하나 이상의 옵션을 선택하셔야 합니다." });
        this.onOpenAlertDialog();
      } else {
        this.props.postCart(postCartBody).then(function (res) {
          console.log(res);
        });

        this.onOpenAlertDialog();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      console.log(this);

      if (this.state.product === undefined) return _react2.default.createElement(_CircularProgress2.default, null);

      var styles = this.state.styles;


      var renderPostScript = function renderPostScript() {
        return _this5.state.product.post_script.map(function (postScript, index) {
          return _react2.default.createElement(
            _Table.TableRow,
            { key: index },
            _react2.default.createElement(
              _Table.TableRowColumn,
              { style: styles.id },
              postScript.id
            ),
            _react2.default.createElement(
              _Table.TableRowColumn,
              { style: styles.title },
              postScript.comment
            ),
            _react2.default.createElement(
              _Table.TableRowColumn,
              { style: styles.userName },
              postScript.user_name
            ),
            _react2.default.createElement(
              _Table.TableRowColumn,
              { style: styles.date },
              postScript.date
            ),
            _react2.default.createElement(
              _Table.TableRowColumn,
              { style: styles.star },
              postScript.star
            )
          );
        });
      };

      var product = this.state.product;


      var cartDialogActions = [_react2.default.createElement(_materialUi.FlatButton, {
        label: '\uC7A5\uBC14\uAD6C\uB2C8\uB85C \uC774\uB3D9',
        primary: true,
        keyboardFocused: true,
        onClick: function onClick() {
          _this5.onCloseCartDialog();
          _this5.props.history.push("/cart");
        }
      }), _react2.default.createElement(_materialUi.FlatButton, {
        label: '\uACC4\uC18D \uC1FC\uD551\uD558\uAE30',
        primary: true,
        onClick: this.onCloseCartDialog
      })];

      var cartAlertDialogActions = [_react2.default.createElement(_materialUi.FlatButton, {
        label: '\uD655\uC778',
        primary: true,
        keyboardFocused: true,
        onClick: function onClick() {
          return _this5.onCloseCartDialog();
        }
      })];

      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'div',
          { className: 'clearfix' },
          _react2.default.createElement(
            'div',
            { className: 'col-md-5' },
            _react2.default.createElement('img', { style: { width: "100%" }, src: '/assets/img/' + product.image_path, alt: '' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-md-7' },
            _react2.default.createElement(
              'h3',
              null,
              product.name
            ),
            _react2.default.createElement(
              'p',
              null,
              product.description
            ),
            _react2.default.createElement(_materialUi.Divider, { className: 'mr-2' }),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'span',
                null,
                '\uD310\uB9E4\uAC00\uACA9'
              ),
              _react2.default.createElement(
                'span',
                { className: 'pull-right', style: { color: 'red' } },
                product.price_sale.toLocaleString() + '\uC6D0'
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'span',
                null,
                '\uC6D0\uC0B0\uC9C0'
              ),
              _react2.default.createElement(
                'span',
                { className: 'pull-right' },
                '\uAD6D\uB0B4\uC0B0'
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'span',
                null,
                '\uBC30\uC1A1'
              ),
              _react2.default.createElement(
                'span',
                { className: 'pull-right' },
                '3\uB9CC\uC6D0 \uC774\uC0C1 \uBB34\uB8CC\uBC30\uC1A1'
              )
            ),
            this.renderOptionsOrCount(),
            this.renderSelectedOptions(),
            this.renderTotalPrice(),
            _react2.default.createElement(
              'div',
              { className: 'py-2' },
              _react2.default.createElement(_materialUi.RaisedButton, {
                style: { width: "50%" },
                label: '\uC7A5\uBC14\uAD6C\uB2C8',
                icon: _react2.default.createElement(_addShoppingCart2.default, null),
                onTouchTap: this.onTouchCart.bind(this)
              }),
              _react2.default.createElement(_materialUi.RaisedButton, {
                href: '/payment',
                style: { width: "50%" },
                label: '\uBC14\uB85C\uAD6C\uB9E4',
                icon: _react2.default.createElement(_creditCard2.default, null),
                onTouchTap: function onTouchTap() {
                  return console.log("바로구매를 하면 구매 페이지로 바로 넘어갈 수 있게");
                }
              })
            )
          )
        ),
        _react2.default.createElement(
          _reactScroll.Element,
          { name: 'productDescription', className: 'product' },
          this.renderTabBar(0),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('img', { src: '/assets/img/' + product.details[0].image_path, alt: '', width: '100%' })
          )
        ),
        _react2.default.createElement(
          _reactScroll.Element,
          { name: 'productInformation', className: 'product' },
          this.renderTabBar(1),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('img', { src: '/assets/img/' + product.details[1].image_path, alt: '', width: '100%' })
          )
        ),
        _react2.default.createElement(
          _reactScroll.Element,
          { name: 'productPostScript', className: 'product' },
          this.renderTabBar(2),
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
                  { style: styles.id },
                  '\uBC88\uD638'
                ),
                _react2.default.createElement(
                  _Table.TableHeaderColumn,
                  { style: styles.titleHeader },
                  '\uC81C\uBAA9'
                ),
                _react2.default.createElement(
                  _Table.TableHeaderColumn,
                  { style: styles.user },
                  '\uC791\uC131\uC790'
                ),
                _react2.default.createElement(
                  _Table.TableHeaderColumn,
                  { style: styles.date },
                  '\uC791\uC131\uC77C'
                ),
                _react2.default.createElement(
                  _Table.TableHeaderColumn,
                  { style: styles.grade },
                  '\uD3C9\uC810'
                )
              )
            ),
            _react2.default.createElement(
              _Table.TableBody,
              { displayRowCheckbox: false, showRowHover: true },
              renderPostScript()
            )
          )
        ),
        _react2.default.createElement(
          _materialUi.Dialog,
          {
            title: '\uC7A5\uBC14\uAD6C\uB2C8 \uB2F4\uAE30',
            actions: cartDialogActions,
            modal: false,
            open: this.state.cartDialogOpen,
            onRequestClose: this.onCloseCartDialog
          },
          '\uC7A5\uBC14\uAD6C\uB2C8\uC5D0 \uB4F1\uB85D\uD558\uC600\uC2B5\uB2C8\uB2E4. \uC7A5\uBC14\uAD6C\uB2C8\uB85C \uC774\uB3D9\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?'
        ),
        _react2.default.createElement(
          _materialUi.Dialog,
          {
            title: '\uC54C\uB9BC\uBA54\uC138\uC9C0',
            actions: cartAlertDialogActions,
            modal: false,
            open: this.state.alertDialogOpen,
            onRequestClose: this.onCloseCartDialog
          },
          this.state.alertText
        )
      );
    }
  }]);

  return ProductDetail;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.single
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    getProduct: _RequestManager.getProduct,
    postCart: _RequestManager.postCart
  }, dispatch);
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ProductDetail);

//# sourceMappingURL=ProductDetail-compiled.js.map