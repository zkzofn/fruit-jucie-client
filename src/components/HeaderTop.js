import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlatButton from 'material-ui/FlatButton';

export default class HeaderTop extends Component {
  constructor(props) {
    super(props);
  }

  pushToUrl(url) {
    this.props.history.push(url)
  }

  render() {
    console.log(this.props)
    const styles = {
      loginBtn: {display: this.props.current.user ? "none" : "inlineBlock"}
    };

    return (
      <div className="clearfix pb-4">
        <div className="floatRight" style={{height: 36}}>
          <FlatButton
            label="로그인"
            onTouchTap={this.pushToUrl.bind(this, "/signin")}
            style={styles.loginBtn}
          />
          <FlatButton label="장바구니" primary={true} disabled={true} />
          <FlatButton label="문의" primary={true} disabled={true} />
          <FlatButton label="마이페이지" secondary={true} disabled={true} />
          <FlatButton label="매장안내" disabled={true} />
          <FlatButton label="회사소개" disabled={true} />
        </div>
      </div>

    )
  }
}
