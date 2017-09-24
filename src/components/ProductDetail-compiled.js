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

var _reactScroll = require('react-scroll');

var _Table = require('material-ui/Table');

var _CircularProgress = require('./CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _separatorCommas = require('./separatorCommas');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProductDetail = function (_Component) {
  _inherits(ProductDetail, _Component);

  function ProductDetail(props) {
    _classCallCheck(this, ProductDetail);

    var _this = _possibleConstructorReturn(this, (ProductDetail.__proto__ || Object.getPrototypeOf(ProductDetail)).call(this, props));

    _this.state = {
      itemOption: 0,
      styles: {
        id: { width: "10%", textAlign: "center" },
        titleHeader: { width: "60%", textAlign: "center" },
        title: { width: "60%" },
        userName: { width: "10%", textAlign: "center" },
        date: { width: "12%", textAlign: "center" },
        star: { width: "8%", textAlign: "center" }
      }
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


        _this2.setState({ product: product });
      });

      _reactScroll.Events.scrollEvent.remove("begin");
      _reactScroll.Events.scrollEvent.remove("end");
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _arguments = arguments;

      _reactScroll.Events.scrollEvent.register("begin", function (to, element) {
        console.log("begin", _arguments);
      });
      _reactScroll.Events.scrollEvent.register("end", function (to, element) {
        console.log("end", _arguments);
      });
      _reactScroll.scrollSpy.update();
    }
  }, {
    key: 'scrollToTop',
    value: function scrollToTop() {
      _reactScroll.animateScroll.scrollToTop();
    }
  }, {
    key: 'scrollToBottom',
    value: function scrollToBottom() {
      _reactScroll.animateScroll.scrollToBottom();
    }
  }, {
    key: 'scrollTo',
    value: function scrollTo() {
      _reactScroll.animateScroll.scrollTo(100);
    }
  }, {
    key: 'scrollMore',
    value: function scrollMore() {
      _reactScroll.animateScroll.scrollMore(100);
    }
  }, {
    key: 'onOptionChange',
    value: function onOptionChange(event, index, value) {
      this.setState({ itemOption: value });
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions() {
      var options = this.state.product.options;


      if (options.length == 0) return _react2.default.createElement(_materialUi.MenuItem, { primaryText: '\uC635\uC158 \uC5C6\uC74C' });

      return options.map(function (option, index) {
        return _react2.default.createElement(_materialUi.MenuItem, { key: index, value: index, primaryText: option.description + ' - ' + (0, _separatorCommas.seperatorCommas)(option.additional_fee) + '\uC6D0' });
      });
    }
  }, {
    key: 'renderTabBar',
    value: function renderTabBar(sequence) {
      var tabBars = [{ name: "상품설명", link: "productDescription" }, { name: "상품정보", link: "productInformation" }, { name: "상품후기", link: "productPostScript" }];

      var renderTabItem = function renderTabItem() {
        return tabBars.map(function (tabBar, index) {
          return _react2.default.createElement(
            'li',
            {
              key: index,
              className: sequence == index ? "detailTabElement detailSelectedTab" : "detailTabElement"
            },
            _react2.default.createElement(
              _reactScroll.Link,
              {
                to: tabBar.link,
                smooth: true,
                duration: 500
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
    key: 'render',
    value: function render() {
      var _this3 = this;

      console.log(this);

      if (this.state.product === undefined) return _react2.default.createElement(_CircularProgress2.default, null);

      var styles = this.state.styles;


      var renderPostScript = function renderPostScript() {
        return _this3.state.product.post_script.map(function (postScript, index) {
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
                (0, _separatorCommas.seperatorCommas)(product.price_sale) + '\uC6D0'
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
            _react2.default.createElement(
              'div',
              { className: 'py-4' },
              _react2.default.createElement(
                'span',
                null,
                '\uC635\uC158'
              ),
              _react2.default.createElement(
                _materialUi.DropDownMenu,
                { value: this.state.itemOption, onChange: this.onOptionChange.bind(this) },
                this.renderOptions()
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'py-2' },
              _react2.default.createElement(_materialUi.RaisedButton, {
                href: '/cart',
                style: { width: "50%" },
                label: '\uC7A5\uBC14\uAD6C\uB2C8',
                icon: _react2.default.createElement(_addShoppingCart2.default, null)
                // 여기서 장바구니에 담는 API를 call 해라,
                // 그리고 팝업같은거 띄워서 계속 쇼핑할지,
                // 장바구니로 갈지 정할 수 있도록 나눠
                , onTouchTap: function onTouchTap() {
                  return console.log("");
                }
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
        )
      );
    }
  }]);

  return ProductDetail;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    getProduct: _RequestManager.getProduct
  }, dispatch);
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ProductDetail);

//# sourceMappingURL=ProductDetail-compiled.js.map