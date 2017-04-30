import React, {Component} from 'react';
import AreaLink from './AreaLink'
import AreaLogo from './AreaLogo'
import SectionNavbar from './SectionNavbar'

export default class index extends React.Component {
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
        <AreaLink />
        <br />
        <AreaLogo />
        <br />
        <SectionNavbar />
      </div>
    )
  }
}

