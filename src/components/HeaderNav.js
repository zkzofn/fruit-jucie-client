import React, { Component } from 'react';
import { FlatButton } from 'material-ui';

export default class HeaderNav extends React.Component {
  render() {
    return (
      <div className="pt-4">
        <FlatButton label="Green" primary={true} href="/items"/>
        <FlatButton label="Soup" primary={true} disabled={true} />
        <FlatButton label="Salad" primary={true} disabled={true} />
      </div>
    )
  }
}

