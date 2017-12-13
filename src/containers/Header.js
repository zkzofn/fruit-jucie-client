import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppBar, Drawer, MenuItem, Divider } from 'material-ui';
import Power from 'material-ui/svg-icons/action/power-settings-new';
import Cart from 'material-ui/svg-icons/action/shopping-cart';
import Question from 'material-ui/svg-icons/action/question-answer';

import HeaderTop from '../components/HeaderTop';
import HeaderLogo from '../components/HeaderLogo';
import HeaderNav from '../components/HeaderNav';

import MainTab from '../components/Tabs/MainTabs';
import LogoMark from '../components/Logo/LogoMark';



class Header extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      open: false,
    }
  }

  componentWillMount() {
  }

  openDrawer () {
    this.setState({open: true})
  }

  closeDrawer() {
    this.setState({open: false})
  }

  titleTouch() {
    this.props.history.push("/")
  }



  render() {
    const headerStyle = {
      position: 'relative',
      width: '100%',
      height: 'auto',
      backgroundColor: '#fff',
      margin: '0 auto',
      overflow: 'hidden'
    };
    //

    return (
      <div style={headerStyle}>
        <LogoMark {...this.props} className="pull-left" />
        <MainTab {...this.props} className="pull-right" />
        <AppBar
          className="appBar"
          title={<span className="cursorPointer">Eat More</span>}
          onTitleTouchTap={this.titleTouch.bind(this)}
          onLeftIconButtonTouchTap={this.openDrawer.bind(this)}
        >
        </AppBar>

        <Drawer
          open={this.state.open}
          docked={false}
          onRequestChange={open => this.setState({open})}
        >
          <MenuItem onTouchTap={() => {
            this.props.history.push("/signin");
            this.closeDrawer();
          }}>
            <Power />
            Sign In
          </MenuItem>
          <MenuItem onTouchTap={() => {
            this.props.history.push("/cart");
            this.closeDrawer();
          }}>
            <Cart />
            장바구니
          </MenuItem>
          <MenuItem>
            <Question />
            문의
          </MenuItem>

          <Divider />
          <MenuItem href="/products" onTouchTap={this.closeDrawer.bind(this)}>Green</MenuItem>
          <MenuItem disabled={true}>Soup</MenuItem>
          <MenuItem disabled={true}>Salad</MenuItem>
        </Drawer>

        {
          // <div className="visible-over-block container">
          //   <HeaderTop {...this.props} />
          //   <HeaderLogo />
          //   <HeaderNav />
          // </div>
        }

      </div>
    )
  }
}




const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);