import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getValidate } from "../../../actions/RequestManager";
import { Dialog, FlatButton } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import Payment from 'material-ui/svg-icons/action/payment';


/**
 * @props
 *    className
 *    days (주 몇 회인지 선택)
 */
class PaymentButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alertOpen: false
    };

    this.alertMessage = `원하는 요일을 ${props.product.days}일 선택해주세요.`;
  }

  handleAlertOpen = () => {
    this.setState({alertOpen: true})
  };

  handleAlertClose = () => {
    this.setState({alertOpen: false})
  };

  onClickPaymentButton() {
    // 0. Options를 제대로 선택했는지 체크
    // 0.1. 제대로 선택했으면 1로
    // 0.2. 제대로 선택하지 않았으면 alert 띄워주고 제대로 선택하도록
    // 1. 여기서 로그인 상태인지 아닌지 한번 체크하고
    // 2.1. 로그인 상태면 제품정보 한번 보여주고, 배송지, 주소, 포인트 등 알려주는 화면으로 ㄱㄱ
    // 2.2. 거기서 결제 누르면 아래의 Order 페이지 보여준다
    // 3. 로그인 상태가 아니면 로그인/회원가입 페이지로 redirect

    const { days } = this.props.product;
    const { dayCount } = this.props;

    const paymentAfterValidate = () => {
      this.props.getValidate().then(result => {
        const { validate } = result.payload.data;

        if (validate) {
          this.props.onClickPaymentButton(true);
        } else {
          this.props.history.push("/signin");
        }
      });
    };

    if (days && dayCount !== days) {
      this.handleAlertOpen();
    } else {
      paymentAfterValidate();
    }
  }

  render() {
    const className = this.props.className ? this.props.className : "";

    const styles = {
      button: {
        margin: 12,
      }
    };

    const alertActions = [
      <FlatButton
        label="확인"
        primary={true}
        onClick={this.handleAlertClose}
      />
    ];

    return (
      <div className={className}>
        <RaisedButton
          icon={<Payment />}
          style={styles.button}
          onClick={this.onClickPaymentButton.bind(this)}
        />
        <Dialog
          actions={alertActions}
          modal={false}
          open={this.state.alertOpen}
          onRequestClose={this.handleAlertClose}
        >
          {this.alertMessage}
        </Dialog>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getValidate
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentButton);


