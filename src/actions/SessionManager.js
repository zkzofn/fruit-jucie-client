import React, { Component } from 'react';
import * as Crypto from 'crypto-js';
import axios from 'axios';

const singleton = Symbol();
const singletonEnforcer = Symbol();

let secretToken = Crypto.SHA1("fRu1t_token_privacy");
let secretProfile = Crypto.SHA1("fRu1t_profile_privacy");

// For production
// const END_POINT = "13.124.237.236:3000";

// For dev-web-server
const END_POINT = "http://localhost:3000";

// For React dev server
// const END_POINT = "/api";

export default class SessionManager extends Component {
  customAxios = axios.create();
  header = {};
  user = {};

  constructor(props) {
    super(props);

    this.customAxios.defaults.baseURL = END_POINT;
  }

  static instance() {
    if (!this[singleton])
      this[singleton] = new SessionManager(singletonEnforcer);

    return this[singleton];
  }

  setToken(token) {
    this.headers.Authorization = token;
  }

  setUser(user) {
    this.user = user;
  }

  login(email, password) {
    return this.customAxios.post("/users/authorize", {
      email: email, password: Crypto.SHA1(password).toString()
    }).then(res => {
      const { sessionKey, user } = res.data;

      let cryptedToken = Crypto.AES.encrypt(sessionKey, secretToken).toString().split("").reverse().join("");
      let cryptedUser = Crypto.AES.encrypt(JSON.stringify(user), secretProfile).toString().split("").reverse().join("");

      localStorage.setItem("token", cryptedToken);
      localStorage.setItem("user", cryptedUser);

      this.setToken(sessionKey);
      this.setUser(user);

      return new Promise((resolve, reject) => resolve({sessionKey, user}));
    })
  }

  logout() {
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
  loadToken() {
    return new Promise((resolve, reject) => {
      try {
        let cryptedToken = localStorage.getItem('token').split('').reverse().join('');
        let cryptedUser = localStorage.getItem('user').split('').reverse().join('');

        let sessionKey = Crypto.AES.decrypt(cryptedToken, secretToken).toString(Crypto.enc.Utf8);
        let user = JSON.parse(Crypto.AES.decrypt(cryptedUser, secretProfile).toString(Crypto.enc.Utf8));

        this.setToken(sessionKey);
        this.setUser(user);

        resolve({ sessionKey, user });
      } catch (e) {
        reject(e)
      }
    });
  }

  /**
   * `token`이 올바른지 검증합니다.
   *
   * @param {string} token
   * @return Promise<User>
   */
  validate() {
    return this.loadToken()
      .then(() => {
        return this.post("/users/validation")
          .then(res => {
            return res.data;
          });
      });
  }

  get(url, query) {
    const generateQueryString = () => {
      let retVar = "?";

      for (let key in query) {
        let value = query[key];
        retVar += `${key}=${value}&`;
      }

      return retVar.substring(0, retVar.length - 1);
    };

    let queryStr = generateQueryString();

    return this.customAxios({
      method: "get",
      url: `${url}${queryStr}`,
      headers: this.headers
    })
  }

  post(url, data) {
    return this.customAxios({
      method: "post",
      url: url,
      headers: this.headers,
      data
    })
  }

  patch(url, data) {
    return this.customAxios({
      method: "patch",
      url: url,
      headers: this.headers,
      data
    })
  }

  put(url, data) {
    return this.customAxios({
      method: "put",
      url: url,
      headers: this.headers,
      data
    })
  }

  del(url, data) {
    return this.customAxios({
      method: "delete",
      url: url,
      headers: this.headers,
      data
    })
  }
}