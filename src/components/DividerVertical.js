import React, { Component } from 'react';

export default class DividerVertical extends Component {
  render() {
    const style = {
      margin: "0 5px",
      color: "#CCC"
    };
    
    return (
      <span style={style}>|</span>
    )
  }
}

