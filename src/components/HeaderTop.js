import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';

export default class HeaderTop extends Component {
  render() {
    return (
      <div className="clearfix pb-4">
        <div className="floatRight" style={{height: 36}}>
          <FlatButton label="로그인" href="/signin" />
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

