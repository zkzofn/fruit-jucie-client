import React, { Component } from 'react';
import Item1 from './Item1';
import Item from './Item';

export default class Items extends Component {
  render() {
    return (
      <div className="container">
        <Item className="col-md-4 col-sm-6" />
        <Item className="col-md-4 col-sm-6" />
        <Item className="col-md-4 col-sm-6" />
        <Item className="col-md-4 col-sm-6" />
        <Item className="col-md-4 col-sm-6" />
        <Item className="col-md-4 col-sm-6" />
      </div>
    )
  }
}

