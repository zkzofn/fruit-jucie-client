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

var _RadioButton = require('material-ui/RadioButton');

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

    _this.onMyAddressListDialogOpen = function () {
      _this.setState({ myAddressListDialogOpen: true });
    };

    _this.onMyAddressListDialogClose = function () {
      _this.setState({ myAddressListDialogOpen: false });
    };

    _this.onSearchAddressDialogOpen = function () {
      _this.setState({ searchAddressDialogOpen: true });
    };

    _this.onSearchAddressDialogClose = function () {
      _this.setState({ searchAddressDialogOpen: false });
    };

    _this.onSearchAddress = function () {
      var data = new FormData();

      data.append("confmKey", "U01TX0FVVEgyMDE3MTAxNTIzMDgwNDEwNzQwNTA=");
      data.append("currentPage", "1");
      data.append("countPerPage", "10");
      data.append("keyword", _this.state.searchAddressTerm);
      data.append("resultType", "json");

      _this.props.getAddressFromAPI(data).then(function (res) {
        var addressList = res.payload.data.results.juso;

        _this.setState({ addressList: addressList });
      });
    };

    _this.onDialogKeyDown = function (event) {
      if (event.key === "Enter") _this.onSearchAddress();
    };

    _this.setSenderName = function (event) {
      _this.setState({ senderName: event.target.value });
    };

    _this.setSenderPhone = function (event) {
      _this.setState({ senderPhone: event.target.value });
    };

    _this.setSenderEmail = function (event) {
      _this.setState({ senderEmail: event.target.value });
    };

    _this.setReceiverName = function (event) {
      _this.setState({ receiverName: event.target.value });
    };

    _this.setReceiverNickname = function (event) {
      _this.setState({ receiverNickname: event.target.value });
    };

    _this.setReceiverZipcode = function (event) {
      _this.setState({ receiverZipcode: event.target.value });
    };

    _this.setReceiverAddress1 = function (event) {};

    _this.setReceiverAddress2 = function (event) {
      _this.setState({ receiverAddress2: event.target.value });
    };

    _this.setReceiverPhone = function (event) {
      _this.setState({ receiverPhone: event.target.value });
    };

    _this.setReceiverRequirement = function (event) {
      _this.setState({ receiverRequirement: event.target.value });
    };

    _this.onSelectAddressDivider = function (event) {
      _this.setState({ addressDivider: event.target.value });

      var currentUser = _this.props.currentUser;


      if (event.target.value === "userAddress") {
        _this.setState({
          receiverName: currentUser.name,
          receiverNickname: currentUser.nickname,
          receiverZipcode: currentUser.zipcode,
          receiverAddress1: currentUser.address1,
          receiverAddress2: currentUser.address2,
          receiverPhone: currentUser.phone
        });
      } else if (event.target.value === "newAddress") {
        _this.setState({
          receiverName: "",
          receiverNickname: "",
          receiverZipcode: "",
          receiverAddress1: "",
          receiverAddress2: "",
          receiverPhone: ""
        });
      }
    };

    _this.onSelectPaymentMethod = function (event) {
      _this.setState({ paymentMethod: event.target.value });
    };

    _this.state = {
      searchAddressDialogOpen: false,
      myAddressListDialogOpen: false,
      searchAddressTerm: "",
      addressDivider: "",
      paymentMethod: "card",
      senderName: "",
      senderPhone: "",
      senderEmail: "",
      receiverName: "",
      receiverNickname: "",
      receiverZipcode: "",
      receiverAddress1: "",
      receiverAddress2: "",
      receiverPhone: "",
      receiverRequirement: "",
      myAddressList: []
    };

    _this.IMP = window.IMP;
    _this.IMP.init("imp08816802");
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

        var currentUser = _this2.props.currentUser;

        _this2.setState({
          senderName: currentUser.name,
          senderPhone: currentUser.phone,
          senderEmail: currentUser.email,
          receiverName: currentUser.name,
          receiverNickname: currentUser.nickname,
          receiverZipcode: currentUser.zipcode,
          receiverAddress1: currentUser.address1,
          receiverAddress2: currentUser.address2,
          receiverPhone: currentUser.phone
        });
      }, 200);
      //

      // 여기서 사용자의 저장되어 있는 주소 있으면 불러와서 address 셋팅해줘야 해
      var getMyAddressListParams = {
        userId: 1
      };
      this.props.getMyAddressList(getMyAddressListParams).then(function (res) {
        var myAddressList = res.payload.data.myAddressList;


        _this2.setState({ myAddressList: myAddressList });
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'onChangeAddress',
    value: function onChangeAddress(searchAddressTerm) {
      this.setState({ searchAddressTerm: searchAddressTerm });
    }

    // 여기도 페이지별로 가져올 수 있게 수정해야 해

  }, {
    key: 'renderAddressList',
    value: function renderAddressList() {
      var _this3 = this;

      var styles = {
        zipCodeHeader: { width: 45 },
        zipCode: { width: 45, fontSize: 8 },
        addressRoad: { fontSize: 11 },
        addressNumber: { fontSize: 9 }
      };
      var onAddressSelect = function onAddressSelect(selectedAddress) {
        _this3.setState({
          receiverZipcode: selectedAddress.zipNo,
          receiverAddress1: selectedAddress.roadAddrPart1,
          searchAddressDialogOpen: false
        });
      };

      var renderAddressElements = function renderAddressElements() {
        return _this3.state.addressList.map(function (address, index) {
          return _react2.default.createElement(
            'li',
            { key: index, onClick: function onClick() {
                return onAddressSelect(address);
              } },
            _react2.default.createElement(
              'div',
              { className: 'inlineBlock', style: styles.zipCode },
              address.zipNo
            ),
            _react2.default.createElement(
              'div',
              { className: 'inlineBlock' },
              _react2.default.createElement(
                'p',
                { style: styles.addressRoad },
                address.roadAddrPart1
              ),
              _react2.default.createElement(
                'p',
                { style: styles.addressNumber },
                address.jibunAddr
              )
            )
          );
        });
      };

      if (this.state.addressList) {
        return _react2.default.createElement(
          'ul',
          null,
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'div',
              { className: 'inlineBlock', style: styles.zipCodeHeader },
              '\uC6B0\uD3B8\uBC88\uD638'
            ),
            _react2.default.createElement(
              'div',
              { className: 'inlineBlock' },
              '\uC8FC\uC18C'
            )
          ),
          renderAddressElements()
        );
      }
    }
  }, {
    key: 'onRequestPayment',
    value: function onRequestPayment() {
      // 결제 전에 값들 다 입력했는지 확인하고 결제로 넘어가야해

      //   paymentMethod: "",
      //   senderName: "",
      //   senderPhone: "",
      //   senderEmail: "",
      //   receiverName: "",
      //   receiverNickname: "",
      //   receiverZipcode: "",
      //   receiverAddress1: "",
      //   receiverAddress2: "",
      //   receiverPhone: "",
      //   receiverRequirement: ""

      var self = this;

      this.IMP.request_pay({
        pg: 'inicis', // version 1.1.0부터 지원.
        pay_method: this.state.paymentMethod,
        merchant_uid: 'merchant_' + new Date().getTime(),
        name: '주문명:결제테스트',
        amount: 14000,
        buyer_email: 'zkzofn@gmail.com',
        buyer_name: '이장호',
        buyer_tel: '010-3399-0081',
        buyer_addr: '서울특별시 강남구 삼성동',
        buyer_postcode: '123-456',
        m_redirect_url: 'http://localhost:8000/payment'
      }, function (rsp) {
        if (rsp.success) {
          var paymentData = {
            user_id: self.props.currentUser.id,
            sender_name: self.state.senderName,
            sender_phone: self.state.senderPhone,
            sender_email: self.state.senderEmail,
            receiver_name: self.state.receiverName,
            receiver_nickname: self.state.receiverNickname,
            receiver_zip_code: self.state.receiverZipcode,
            receiver_address1: self.state.receiverAddress1,
            receiver_address2: self.state.receiverAddress2,
            receiver_phone: self.state.receiverPhone,
            status: 1,
            payment_type: self.state.paymentMethod,
            total_price: rsp.paid_amount,
            imp_uid: rsp.imp_uid,
            merchant_uid: rsp.merchant_uid,
            card_confirm_num: rsp.apply_num
          };

          self.props.postOrder(paymentData).then(function (res) {
            console.log(res);

            self.props.history.push("");
          });

          // var msg = '결제가 완료되었습니다.';
          // msg += '고유ID : ' + rsp.imp_uid;
          // msg += '상점 거래ID : ' + rsp.merchant_uid;
          // msg += '결제 금액 : ' + rsp.paid_amount;
          // msg += '카드 승인번호 : ' + rsp.apply_num;
        } else {
          var msg = '결제에 실패하였습니다.';
          msg += '에러내용 : ' + rsp.error_msg;
          msg += '다시 시도해보세요.';
        }
        alert(msg);
      });
    }
  }, {
    key: 'renderMyAddressList',
    value: function renderMyAddressList() {
      var _this4 = this;

      var styles = {
        zipCodeHeader: { width: 45 },
        zipCode: { width: 45, fontSize: 8 },
        addressRoad: { fontSize: 11 },
        addressNumber: { fontSize: 9 }
      };

      var onMyAddressListSelect = function onMyAddressListSelect(selectedAddress) {
        _this4.setState({
          receiverZipcode: selectedAddress.zip_code,
          receiverAddress1: selectedAddress.address1,
          receiverAddress2: selectedAddress.address2,
          myAddressListDialogOpen: false
        });
      };

      var renderMyAddressListElements = function renderMyAddressListElements() {
        return _this4.state.myAddressList.map(function (address, index) {
          return _react2.default.createElement(
            'li',
            { key: index, onClick: function onClick() {
                return onMyAddressListSelect(address);
              } },
            _react2.default.createElement(
              'div',
              { className: 'inlineBlock', style: styles.zipCode },
              address.zip_code
            ),
            _react2.default.createElement(
              'div',
              { className: 'inlineBlock' },
              _react2.default.createElement(
                'p',
                { style: styles.addressRoad },
                address.address1
              ),
              _react2.default.createElement(
                'p',
                { style: styles.addressNumber },
                address.address2
              )
            )
          );
        });
      };

      if (this.state.myAddressList.length === 0) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'p',
            null,
            '\uB4F1\uB85D\uB41C \uC8FC\uC18C \uBAA9\uB85D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.'
          ),
          _react2.default.createElement(
            'p',
            null,
            'My page\uC5D0\uC11C \uB4F1\uB85D \uAC00\uB2A5\uD569\uB2C8\uB2E4.'
          )
        );
      } else {
        return _react2.default.createElement(
          'ul',
          null,
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'div',
              { className: 'inlineBlock', style: styles.zipCodeHeader },
              '\uC6B0\uD3B8\uBC88\uD638'
            ),
            _react2.default.createElement(
              'div',
              { className: 'inlineBlock' },
              '\uC8FC\uC18C'
            )
          ),
          renderMyAddressListElements()
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

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

      var formStyles = {
        width: 256,
        margin: "auto"
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
        console.log(_this5.state.cartItems);
        return _this5.state.cartItems.map(function (cartItem, index) {
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
      //
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
        return _this5.state.cartItems.map(function (cartItem, index) {
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
        return _this5.state.cartItems.map(function (cartItem, index) {
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

        _this5.state.cartItems.forEach(function (cartItem) {
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
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_materialUi.TextField, {
                  hintText: '',
                  floatingLabelText: '\uBCF4\uB0B4\uB294 \uBD84',
                  floatingLabelFixed: true,
                  value: this.state.senderName,
                  onChange: this.setSenderName
                })
              ),
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_materialUi.TextField, {
                  hintText: '',
                  floatingLabelText: '\uD734\uB300\uD3F0',
                  floatingLabelFixed: true,
                  value: this.state.senderPhone,
                  onChange: this.setSenderPhone
                })
              ),
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_materialUi.TextField, {
                  hintText: '',
                  floatingLabelText: '\uC774\uBA54\uC77C',
                  floatingLabelFixed: true,
                  value: this.state.senderEmail,
                  onChange: this.setSenderEmail
                })
              )
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
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                _RadioButton.RadioButtonGroup,
                {
                  className: 'inlineBlock',
                  defaultSelected: 'userAddress',
                  name: 'addressGroup',
                  onChange: this.onSelectAddressDivider
                },
                _react2.default.createElement(_RadioButton.RadioButton, {
                  className: 'inlineBlock',
                  value: 'userAddress',
                  label: '\uC8FC\uBB38\uC790 \uC815\uBCF4\uC640 \uB3D9\uC77C'
                }),
                _react2.default.createElement(_RadioButton.RadioButton, {
                  className: 'inlineBlock',
                  value: 'newAddress',
                  label: '\uC0C8\uB85C\uC6B4 \uBC30\uC1A1\uC9C0'
                })
              ),
              _react2.default.createElement(_materialUi.RaisedButton, {
                className: 'inlineBlock',
                label: '\uBC30\uC1A1\uC9C0 \uB9AC\uC2A4\uD2B8\uC5D0\uC11C \uD655\uC778',
                onTouchTap: this.onMyAddressListDialogOpen,
                primary: true
              }),
              _react2.default.createElement(
                _materialUi.Dialog,
                {
                  title: '\uB098\uC758 \uBC30\uC1A1\uC9C0 \uB9AC\uC2A4\uD2B8',
                  modal: false,
                  open: this.state.myAddressListDialogOpen,
                  onRequestClose: this.onMyAddressListDialogClose
                },
                this.renderMyAddressList()
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_materialUi.TextField, {
                floatingLabelText: '\uBC1B\uB294\uBD84',
                floatingLabelFixed: true,
                value: this.state.receiverName,
                onChange: this.setReceiverName
              })
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_materialUi.TextField, {
                floatingLabelText: '\uBC1B\uB294\uBD84 \uB2C9\uB124\uC784',
                floatingLabelFixed: true,
                value: this.state.receiverNickname,
                onChange: this.setReceiverNickname
              })
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_materialUi.TextField, {
                style: { width: 100 },
                floatingLabelText: '\uC6B0\uD3B8\uBC88\uD638',
                floatingLabelFixed: true,
                value: this.state.receiverZipcode,
                onChange: this.setReceiverZipcode,
                disabled: true
              }),
              _react2.default.createElement(_materialUi.RaisedButton, {
                label: '\uC6B0\uD3B8\uBC88\uD638 \uCC3E\uAE30',
                primary: true,
                onTouchTap: this.onSearchAddressDialogOpen
              })
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_materialUi.TextField, {
                floatingLabelText: '\uC8FC\uC18C',
                floatingLabelFixed: true,
                value: this.state.receiverAddress1,
                onChange: this.setReceiverAddress1,
                disabled: true
              })
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_materialUi.TextField, {
                floatingLabelText: '\uB098\uBA38\uC9C0 \uC8FC\uC18C',
                floatingLabelFixed: true,
                value: this.state.receiverAddress2,
                onChange: this.setReceiverAddress2
              })
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_materialUi.TextField, {
                floatingLabelText: '\uD734\uB300\uD3F0',
                floatingLabelFixed: true,
                value: this.state.receiverPhone,
                onChange: this.setReceiverPhone
              })
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_materialUi.TextField, {
                floatingLabelText: '\uBC30\uC1A1 \uC694\uCCAD\uC0AC\uD56D',
                floatingLabelFixed: true,
                value: this.state.receiverRequirement,
                onChange: this.setReceiverRequirement
              })
            ),
            _react2.default.createElement(
              _materialUi.Dialog,
              {
                title: '\uC8FC\uC18C\uAC80\uC0C9',
                modal: false,
                open: this.state.searchAddressDialogOpen,
                onRequestClose: this.onSearchAddressDialogClose
              },
              _react2.default.createElement(_materialUi.TextField, {
                floatingLabelText: '\uC8FC\uC18C \uC785\uB825',
                floatingLabelFixed: true,
                hintText: '\uAC80\uC0C9\uC5B4 \uC608 : \uB3C4\uB85C\uBA85(\uBC18\uD3EC\uB300\uB85C 58), \uAC74\uBB3C\uBA85(\uB3C5\uB9BD\uAE30\uB150\uAD00), \uC9C0\uBC88(\uC0BC\uC131\uB3D9 25)',
                fullWidth: true,
                value: this.state.searchAddressTerm,
                onChange: function onChange(event) {
                  return _this5.onChangeAddress(event.target.value);
                },
                onKeyPress: this.onDialogKeyDown
              }),
              _react2.default.createElement(_materialUi.RaisedButton, {
                label: 'Search',
                primary: true,
                onTouchTap: this.onSearchAddress
              }),
              this.renderAddressList()
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'h4',
              null,
              '\uACB0\uC81C\uC218\uB2E8'
            ),
            _react2.default.createElement(_materialUi.Divider, null),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                _RadioButton.RadioButtonGroup,
                {
                  className: 'inlineBlock',
                  defaultSelected: 'card',
                  name: 'paymentGroup',
                  onChange: this.onSelectPaymentMethod
                },
                _react2.default.createElement(_RadioButton.RadioButton, {
                  className: 'inlineBlock',
                  value: 'card',
                  label: '\uC2E0\uC6A9\uCE74\uB4DC'
                }),
                _react2.default.createElement(_RadioButton.RadioButton, {
                  className: 'inlineBlock',
                  value: 'cash',
                  label: '\uACC4\uC88C\uC774\uCCB4'
                }),
                _react2.default.createElement(_RadioButton.RadioButton, {
                  className: 'inlineBlock',
                  value: 'kakao',
                  label: '\uCE74\uCE74\uC624\uACB0\uC81C'
                })
              )
            ),
            _react2.default.createElement(_materialUi.RaisedButton, {
              label: '\uACB0\uC81C\uD558\uAE30',
              primary: true,
              onTouchTap: function onTouchTap() {
                return _this5.onRequestPayment();
              },
              disabled: this.state.paymentMethod === "" || this.state.senderName === "" || this.state.senderPhone === "" || this.state.senderEmail === "" || this.state.receiverName === "" || this.state.receiverNickname === "" || this.state.receiverZipcode === "" || this.state.receiverAddress1 === "" || this.state.receiverAddress2 === "" || this.state.receiverPhone === ""
            })
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
    getAddressFromAPI: _RequestManager.getAddressFromAPI,
    getMyAddressList: _RequestManager.getMyAddressList,
    postOrder: _RequestManager.postOrder
  }, dispatch);
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Order);

//# sourceMappingURL=Order-compiled.js.map