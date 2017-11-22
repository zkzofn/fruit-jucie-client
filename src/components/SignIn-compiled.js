'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _materialUi = require('material-ui');

var _RequestManager = require('../actions/RequestManager');

var _cryptoJs = require('crypto-js');

var _cryptoJs2 = _interopRequireDefault(_cryptoJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignIn = function (_React$Component) {
  _inherits(SignIn, _React$Component);

  function SignIn(props) {
    _classCallCheck(this, SignIn);

    var _this = _possibleConstructorReturn(this, (SignIn.__proto__ || Object.getPrototypeOf(SignIn)).call(this, props));

    _this.handleAlertOpen = function () {
      _this.setState({ alertOpen: true });
    };

    _this.handleAlertClose = function () {
      _this.setState({
        account: "",
        password: "",
        alertOpen: false
      });
    };

    _this.onChangeAccount = function (event) {
      _this.setState({ account: event.target.value });
    };

    _this.onChangePassword = function (event) {
      _this.setState({ password: event.target.value });
    };

    _this.onKeyEnter = function (event) {
      if (event.key === "Enter") {
        _this.submit();
        event.preventDefault();
      }
    };

    _this.submit = function () {
      if (_this.state.account === "") {
        _this.refs.loginAccount.focus();
      } else if (_this.state.password === "") {
        _this.refs.loginPassword.focus();
      } else {
        // 로그인 시도
        var data = {
          account: _this.state.account,
          password: _cryptoJs2.default.SHA1(_this.state.password).toString()
        };

        _this.props.postLogin(data).then(function (result) {
          if (_this.props.current.user) {
            _this.props.history.push("/");
          } else {
            _this.setState({
              alertMessage: result.payload.data.msg,
              alertOpen: true
            });
          }
          // if (result.payload.data.status === 200) {
          //   this.props.history.goBack();
          // } else if (result.payload.data.status === 404)
          //   this.setState({
          //     alertMessage: result.payload.data.msg,
          //     alertOpen: true
          //   })
        });
      }
    };

    _this.state = {
      alertOpen: false,
      account: "",
      password: "",
      alertMessage: ""
    };
    return _this;
  }

  _createClass(SignIn, [{
    key: 'render',
    value: function render() {
      console.log(this);

      var styles = {
        signInStyle: {
          width: 256,
          margin: "auto"
        }
      };

      var alertActions = [_react2.default.createElement(_materialUi.FlatButton, {
        label: 'OK',
        primary: true,
        onClick: this.handleAlertClose
      })];

      return _react2.default.createElement(
        'div',
        { style: styles.signInStyle },
        _react2.default.createElement(_materialUi.TextField, {
          floatingLabelText: 'ID',
          value: this.state.account,
          onChange: this.onChangeAccount,
          onKeyPress: this.onKeyEnter,
          ref: 'loginAccount'
        }),
        _react2.default.createElement('br', null),
        _react2.default.createElement(_materialUi.TextField, {
          floatingLabelText: 'Password',
          type: 'password',
          value: this.state.password,
          onChange: this.onChangePassword,
          onKeyPress: this.onKeyEnter,
          ref: 'loginPassword'
        }),
        _react2.default.createElement('br', null),
        _react2.default.createElement(_materialUi.RaisedButton, {
          label: 'Sign In',
          primary: true,
          onTouchTap: this.submit,
          fullWidth: true
        }),
        _react2.default.createElement(
          _materialUi.Dialog,
          {
            actions: alertActions,
            modal: false,
            open: this.state.alertOpen,
            onRequestClose: this.handleAlertClose
          },
          this.state.alertMessage
        )
      );
    }
  }]);

  return SignIn;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    current: state.current
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({
    postLogin: _RequestManager.postLogin
  }, dispatch);
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SignIn);

//# sourceMappingURL=SignIn-compiled.js.map