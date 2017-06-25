import React, { Component } from 'react';
import Item1 from './Item1';
import Item from './Item';

export default class Items extends Component {
  render() {
    return (
      <div className="container">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    )
  }
}

