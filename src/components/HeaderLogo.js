import React, {Component} from 'react';

export default class HeaderLogo extends React.Component {
  render() {
    return (
      <div className="alignCenter">
        <a href="/">
          <img
            style={{width: 300}}
            className="cursorPointer"
            src="/assets/img/logo.png"
            alt=""
          />
        </a>
      </div>
    )
  }
}

