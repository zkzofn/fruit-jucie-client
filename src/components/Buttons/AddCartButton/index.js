import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AddCart from 'material-ui/svg-icons/action/add-shopping-cart';

/**
 * @props
 *    className
 *    days (주 몇 회인지 선택 / default: 3)
 */
export default class AddCartButton extends Component {
  constructor(props) {
    super(props);
  }

  onClickAddCartButton() {
    // 여기서 로그인 상태인지 아닌지 한번 체크하고
    // --> 로그인 상태면 장바구니에 넣는 API 콜 하고, [계속 쇼핑할건지 / 장바구니로 갈지] Dialog 띄워주고
    // --> 로그인 상태가 아니면 로그인/회원가입 페이지로 redirect 했다가 장바구니에 넣어


    // 여기서 사용자 정보, 제품정보 param으로 해서 AddCart function call
    console.log("onClickaAddCartButton");


    // const postCartBody = {
    //   userId: this.props.currentUser.id,
    //   product: this.state.product,
    //   selectedOptions: this.state.selectedOptions
    // };
    //
    // if (this.state.product.options.length > 0 && this.state.selectedOptions.length === 0) {
    //   this.setState({alertText: "하나 이상의 옵션을 선택하셔야 합니다."});
    //   this.onOpenAlertDialog();
    // } else {
    //   this.props.postCart(postCartBody)
    //     .then(res => {
    //       console.log(res);
    //     });
    //
    //   this.onOpenCartDialog();
    // }
  }


  render() {
    const className = this.props.className ? this.props.className : "";

    const styles = {
      button: {
        margin: 12,
      }
    };

    return (
      <div className={className}>
        <RaisedButton
          icon={<AddCart />}
          style={styles.button}
          onClick={this.onClickAddCartButton.bind(this)}
        />
      </div>
    )
  }
}