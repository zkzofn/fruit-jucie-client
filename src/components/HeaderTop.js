import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';

export default class HeaderTop extends Component {
  render() {
    const style = {
      'float': 'right',
      'margin': 0,
      'padding': 0,
      'border': 0
    };

    return (
      <div style={style}>
        <FlatButton label="로그인" />
        <FlatButton label="장바구니" primary={true} />
        <FlatButton label="마이페이지" secondary={true} />
        <FlatButton label="매장안내" disabled={true} />
        <FlatButton label="회사소개" />
      </div>
    )
  }
}

