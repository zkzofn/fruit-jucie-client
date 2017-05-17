import React, {Component} from 'react';
import HeaderTop from '../components/HeaderTop'
import HeaderLogo from '../components/HeaderLogo'
import HeaderNav from '../components/HeaderNav'

export default class Header extends Component {
  render() {
    // const headerStyle = {
    //   position: 'relative',
    //   width: '100%',
    //   height: 'auto',
    //   backgroundColor: '#fff',
    //   margin: '0 auto',
    //   overflow: 'hidden'
    // };

    
    return (
      // <div style={headerStyle}>
      <div>
        <HeaderTop />
        <br />
        <HeaderLogo />
        <br />
        <HeaderNav />
      </div>
    )
  }
}

