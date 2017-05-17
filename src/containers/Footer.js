import React, {Component} from 'react';

export default class Footer extends Component {
  render() {
    const style = {
      'width': '100%'
    };

    return (
      <div>
        <img className src="http://placehold.it/1600x300" style={style} />
      </div>
    )
  }
}

