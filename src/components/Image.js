import React, { Component } from 'react';

export default class Image extends Component {
  render() {
    const style = {
      background: `url(${this.props.path}) center center`,
      backgroundSize: 'cover',
      // cursor: 'pointer',
    };
    
    return (
      <div style={style} className={this.props.className}></div>
    )
  }
}

