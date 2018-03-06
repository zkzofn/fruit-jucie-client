import React, { Component } from 'react';
import Progress from 'material-ui/CircularProgress';

export default class CircularProgress extends Component {
  render() {
    return (
      <div style={{paddingTop: 250, paddingBottom: 300}}>
        <div style={{width: 60, margin: 'auto'}}>
          <Progress size={60} thickness={7} />
        </div>
      </div>
    )
  }
}

