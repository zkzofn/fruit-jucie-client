import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';

export default class index extends React.Component {
  render() {
    const style = {
      'float': 'center',
      'position': 'relative',
    };

    return (
      <div style={style}>
        <FlatButton label="무엇을" primary={true} />
        <FlatButton label="무엇을" primary={true} />
        <FlatButton label="팔면" primary={true} />
        <FlatButton label="좋을까" primary={true} />
        <FlatButton label="요?" primary={true} />
      </div>
    )
  }
}

