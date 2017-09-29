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
import { getUser } from '../actions/RequestManager';

class Header extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      open: false,
    }
  }

  componentWillMount() {
    // 여기서 무조건 userId = 1 로 넣어주는데 이부분은 제대로 설계해서 수정해야한다.
    const getUserParam = {
      userId: 1 
    };

    this.props.getUser(getUserParam);
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
    // const headerStyle = {
    //   position: 'relative',
    //   width: '100%',
    //   height: 'auto',
    //   backgroundColor: '#fff',
    //   margin: '0 auto',
    //   overflow: 'hidden'
    // };

    return (
      <div>
        <AppBar
          className="visible-under-flex"
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
          <MenuItem href="/signin">
            <Power />
            Sign In
          </MenuItem>
          <MenuItem>
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

        <div className="visible-over-block container">
          <HeaderTop />
          <HeaderLogo />
          <HeaderNav />
        </div>

      </div>
    )
  }
}


function mapStateToProps(state) {
  return { currentUser: state.currentUser.single};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser,
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);