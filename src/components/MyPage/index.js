import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UpperBar from '../UpperBar';
import MyOrderList from '../MyOrderList'
import MyPrivateInfo from '../MyPrivateInfo';

class MyPage extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    // 로그인상태인지 먼저 체크하고 정보 불러오자

  }

  render() {
    return (
      <div>
        <UpperBar
          backgroundColor="#333333"
          textColor="white"
          text="마이 페이지"
        />
        <MyOrderList />
        <MyPrivateInfo />

        
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
    // getValidate
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);


