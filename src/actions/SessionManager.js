import React, { Component } from 'react';
import * as Crypto from 'crypto-js';
import axios from 'axios';

const singleton = Symbol();
const singletonEnforcer = Symbol();

let secretToken = Crypto.SHA1("fRu1t_token_privacy");
let secretProfile = Crypto.SHA1("fRu1t_profile_privacy");

// For production
const END_POINT = "http://13.124.237.236:3000";

// For dev-web-server
// const END_POINT = "http://localhost:3000";

// For React dev server
// const END_POINT = "/api";

export default class SessionManager extends Component {
  customAxios = axios.create();
  headers = {};
  user = {};

  constructor(props) {
    super(props);

    this.customAxios.defaults.baseURL = END_POINT;
    this.customAxios.defaults.withCredintials = true;
  }

  static instance() {
    if (!this[singleton])
      this[singleton] = new SessionManager(singletonEnforcer);

    return this[singleton];
  }

  setToken(token) {
    this.headers.authorization = token;
  }

  setUser(user) {
    this.user = user;
  }

  setSession({sessionKey, user}) {
    const userInfoString = JSON.stringify(user);

    localStorage.setItem("eatmore_sessionKey", sessionKey);
    localStorage.setItem("eatmore_user", userInfoString);

    this.setToken(sessionKey);
    this.setUser(user);

    return new Promise((resolve, reject) => resolve({sessionKey, user}));
  }

  logout() {
    this.setToken("");
    this.setUser({});

    localStorage.removeItem("eatmore_sessionKey");
    localStorage.removeItem("eatmore_user");
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
        const sessionKey = localStorage.getItem('eatmore_sessionKey');
        const user = JSON.parse(localStorage.getItem('eatmore_user'));

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
    return this.loadToken().then(() => {
      return this.get("/user/validate")
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

    return this.loadToken().then(() => {
      return this.customAxios({
        method: "get",
        url: `${url}${queryStr}`,
        headers: this.headers
      })
    })
  }

  post(url, data) {
    return this.loadToken().then(() => {
      return this.customAxios({
        method: "post",
        url: url,
        headers: this.headers,
        data
      })
    })
  }

  patch(url, data) {
    return this.loadToken().then(() => {
      return this.customAxios({
        method: "patch",
        url: url,
        headers: this.headers,
        data
      })
    })
  }

  put(url, data) {
    return this.loadToken().then(() => {
      return this.customAxios({
        method: "put",
        url: url,
        headers: this.headers,
        data
      })
    })
  }

  del(url, data) {
    return this.loadToken().then(() => {
      return this.customAxios({
        method: "delete",
        url: url,
        headers: this.headers,
        data
      })
    })
  }
}