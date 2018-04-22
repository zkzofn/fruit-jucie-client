import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UpperBar from '../UpperBar';

class MyPrivateInfo extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {

  }

  render() {
    return (
      <div>
        <UpperBar
          backgroundColor="#333333"
          textColor="white"
          text="개인정보수정"
        />

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

export default connect(mapStateToProps, mapDispatchToProps)(MyPrivateInfo);


