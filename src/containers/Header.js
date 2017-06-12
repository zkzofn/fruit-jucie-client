import React, { Component } from 'react';
import { AppBar } from 'material-ui'
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
        <AppBar
          className="visible-under-flex"
          title="땡이네 과일가게"
        />
        <Drawer>

        </Drawer>

        <div className="visible-over-block">
          <HeaderTop />
          <br />
          <HeaderLogo />
          <br />
          <HeaderNav />
        </div>

      </div>
    )
  }
}

