'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cryptoJs = require('crypto-js');

var Crypto = _interopRequireWildcard(_cryptoJs);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var singleton = Symbol();
var singletonEnforcer = Symbol();

var secretToken = Crypto.SHA1("fRu1t_token_privacy");
var secretProfile = Crypto.SHA1("fRu1t_profile_privacy");

// For production
// const END_POINT = "http://13.124.237.236:3000";

// For dev-web-server
// const END_POINT = "http://localhost:3000";

// For React dev server
var END_POINT = "/api";

var SessionManager = function (_Component) {
  _inherits(SessionManager, _Component);

  function SessionManager(props) {
    _classCallCheck(this, SessionManager);

    var _this = _possibleConstructorReturn(this, (SessionManager.__proto__ || Object.getPrototypeOf(SessionManager)).call(this, props));

    _this.customAxios = _axios2.default.create();
    _this.header = {};
    _this.user = {};


    _this.customAxios.defaults.baseURL = END_POINT;
    return _this;
  }

  _createClass(SessionManager, [{
    key: 'setToken',
    value: function setToken(token) {
      this.headers.Authorization = token;
    }
  }, {
    key: 'setUser',
    value: function setUser(user) {
      this.user = user;
    }
  }, {
    key: 'login',
    value: function login(email, password) {
      var _this2 = this;

      return this.customAxios.post("/users/authorize", {
        email: email, password: Crypto.SHA1(password).toString()
      }).then(function (res) {
        var _res$data = res.data,
            sessionKey = _res$data.sessionKey,
            user = _res$data.user;


        var cryptedToken = Crypto.AES.encrypt(sessionKey, secretToken).toString().split("").reverse().join("");
        var cryptedUser = Crypto.AES.encrypt(JSON.stringify(user), secretProfile).toString().split("").reverse().join("");

        localStorage.setItem("token", cryptedToken);
        localStorage.setItem("user", cryptedUser);

        _this2.setToken(sessionKey);
        _this2.setUser(user);

        return new Promise(function (resolve, reject) {
          return resolve({ sessionKey: sessionKey, user: user });
        });
      });
    }
  }, {
    key: 'logout',
    value: function logout() {
      this.setToken("");
      this.setUser({});

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    /**
     * localStorage에 저장된 token과 user 정보를 가져옵니다.
     * 만약 decrypt 과정에서 오류가 발생하면 promise가 reject됩니다.
     *
     * @return Promise<{ user: User, sessionKey: string }>
     */

  }, {
    key: 'loadToken',
    value: function loadToken() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        try {
          var cryptedToken = localStorage.getItem('token').split('').reverse().join('');
          var cryptedUser = localStorage.getItem('user').split('').reverse().join('');

          var sessionKey = Crypto.AES.decrypt(cryptedToken, secretToken).toString(Crypto.enc.Utf8);
          var user = JSON.parse(Crypto.AES.decrypt(cryptedUser, secretProfile).toString(Crypto.enc.Utf8));

          _this3.setToken(sessionKey);
          _this3.setUser(user);

          resolve({ sessionKey: sessionKey, user: user });
        } catch (e) {
          reject(e);
        }
      });
    }

    /**
     * `token`이 올바른지 검증합니다.
     *
     * @param {string} token
     * @return Promise<User>
     */

  }, {
    key: 'validate',
    value: function validate() {
      var _this4 = this;

      return this.loadToken().then(function () {
        return _this4.post("/users/validation").then(function (res) {
          return res.data;
        });
      });
    }
  }, {
    key: 'get',
    value: function get(url, query) {
      var generateQueryString = function generateQueryString() {
        var retVar = "?";

        for (var key in query) {
          var value = query[key];
          retVar += key + '=' + value + '&';
        }

        return retVar.substring(0, retVar.length - 1);
      };

      var queryStr = generateQueryString();

      return this.customAxios({
        method: "get",
        url: '' + url + queryStr,
        headers: this.headers
      });
    }
  }, {
    key: 'post',
    value: function post(url, data) {
      return this.customAxios({
        method: "post",
        url: url,
        headers: this.headers,
        data: data
      });
    }
  }, {
    key: 'patch',
    value: function patch(url, data) {
      return this.customAxios({
        method: "patch",
        url: url,
        headers: this.headers,
        data: data
      });
    }
  }, {
    key: 'put',
    value: function put(url, data) {
      return this.customAxios({
        method: "put",
        url: url,
        headers: this.headers,
        data: data
      });
    }
  }, {
    key: 'del',
    value: function del(url, data) {
      return this.customAxios({
        method: "delete",
        url: url,
        headers: this.headers,
        data: data
      });
    }
  }], [{
    key: 'instance',
    value: function instance() {
      if (!this[singleton]) this[singleton] = new SessionManager(singletonEnforcer);

      return this[singleton];
    }
  }]);

  return SessionManager;
}(_react.Component);

exports.default = SessionManager;

//# sourceMappingURL=SessionManager-compiled.js.map