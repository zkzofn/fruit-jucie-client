import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';

export default class HeaderNav extends React.Component {
  render() {
    return (
      <div>
        <FlatButton label="고구마파뤠" primary={true} href="/items"/>
        <FlatButton label="item" primary={true} disabled={true} />
        <FlatButton label="item" primary={true} disabled={true} />
        <FlatButton label="item" primary={true} disabled={true} />
        <FlatButton label="item" primary={true} disabled={true} />
      </div>
    )
  }
}

