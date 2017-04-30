import React, {Component} from 'react';

export default class index extends React.Component {
  render() {
    const style = {
      'width': '100%'
    };

    const spaceStyle = {
      'height': '10px'
    };

    return (
      <div>
        <img className src="http://placehold.it/1600x700" style={style} />
        <div style={spaceStyle} ></div>
        <img className src="http://placehold.it/600x400" className="col-md-4" />
        <img className src="http://placehold.it/600x400" className="col-md-4" />
        <img className src="http://placehold.it/600x400" className="col-md-4" />
        <div style={spaceStyle} ></div>
      </div>
    )
  }
}

