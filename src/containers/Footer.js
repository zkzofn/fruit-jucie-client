import React, {Component} from 'react';
import FooterCS from '../components/FooterCS';
import FooterBottom from '../components/FooterBottom';

export default class Footer extends Component {
  render() {
    const style = {
      'width': '100%'
    };

    return (
      <div>
        <FooterCS />
        <FooterBottom />
      </div>
    )
  }
}


