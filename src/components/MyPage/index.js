import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, ListItem } from 'material-ui/List';
import { TextField, Divider } from 'material-ui';
import { getValidate } from "../../actions/RequestManager";
import UpperBar from '../UpperBar';
import MyOrderList from './MyOrderList'
import MyPrivateInfo from './MyPrivateInfo';
import MyOrderAddressInfo from './MyOrderAddressInfo';
import styles from './style.css';

class MyPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMenu: 0
    };

    this.menus = ["주문내역", "개인정보수정"];
  }

  componentWillMount() {
    // 로그인상태인지 먼저 체크하고 정보 불러오자
    this.props.getValidate().then(result => {
      const { validate } = result.payload.data;

      if (!validate)
        this.props.history.push("/signin");


    })
  }

  onSelectMenu(index) {
    this.setState({selectedMenu: index})
  }

  renderNavLists() {
    return this.menus.map((menu, index) => {
      return (
        <ListItem
          key={index}
          primaryText={menu}
          onClick={this.onSelectMenu.bind(this, index)}
        />
      )
    });
  }

  renderContents() {
    switch (this.state.selectedMenu) {
      case 0: {
        return <MyOrderList />;
      }
      case 1: {
        return <MyPrivateInfo {...this.props} />;
      }
      case 2: {
        return <MyOrderAddressInfo />;
      }
      default: {
        return <MyOrderList />;
      }
    }

    // if (this.state.selectedMenu === 1) {
    //   return <MyPrivateInfo />;
    // } else if (this.state.) {
    //
    // } else {
    //   return <MyOrderList />;
    // }
  }

  render() {
    return (
      <div>
        <UpperBar
          backgroundColor="#333333"
          textColor="white"
          text="마이 페이지"
          fontSize={40}
        />
        <div className="pt-4">
          <div className="col-md-3">
            <List className="boxed-group">
              {this.renderNavLists()}
            </List>
          </div>

          <div className="col-md-9 pb-4">
            <div className={styles.menuTitle}>
              {this.menus[this.state.selectedMenu]}
            </div>
            <Divider />

            {this.renderContents()}
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    // validate: state.validate
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getValidate
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);


