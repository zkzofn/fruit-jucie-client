import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dialog, FlatButton } from 'material-ui';
import UpperBar from '../UpperBar';
import SelectDay from '../Buttons/SelectDay';
import PaymentBar from '../PaymentBar';
import Order from '../Order';
import CircularProgress from '../CircularProgress';

import { getProduct, getProductCheck } from '../../actions/RequestManager';

/**
 * @props
 *    className
 */
class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paymentClicked: false,
      count: 0,
      mon: false,
      tue: false,
      wed: false,
      thur: false,
      fri: false,
      alertOpen: false
    };

    this.alertMessage = "잘못된 경로로 접속하였습니다.";
  }

  componentWillMount() {
    // 여기서 item 정보 불러와
    //    DB 상에서 days 는 null 허용

    const params = {
      productId: this.props.match.params.productId
    };

    this.props.getProductCheck(params).then(res => {
      const { productCheck } = res.payload.data;

      if (productCheck) {
        this.props.getProduct(params)
      } else {
        console.log(productCheck);
        // 여기서 product 결과 없을때 alert
        this.setState({alertOpen: true})
      }
    });
  }

  handleAlertOpen = () => {
    this.setState({alertOpen: true})
  };

  handleAlertClose = () => {
    this.setState({alertOpen: false});
    this.props.history.push("/shop");
  };

  onClickPaymentButton(paymentClicked) {
    this.setState({paymentClicked})
  }

  onClickMon(mon, count) {
    this.setState({mon, count});
  }

  onClickTue(tue, count) {
    this.setState({tue, count})
  }

  onClickWed(wed, count) {
    this.setState({wed, count})
  }

  onClickThur(thur, count) {
    this.setState({thur, count})
  }

  onClickFri(fri, count) {
    this.setState({fri, count})
  }

  //
  render() {
    const alertActions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.handleAlertClose}
      />
    ];

    if (this.props.product.id === undefined)
      return (
        <div>
          <Dialog
            actions={alertActions}
            modal={false}
            open={this.state.alertOpen}
            onRequestClose={this.handleAlertClose}
          >
            {this.alertMessage}
          </Dialog>
          <CircularProgress />
        </div>
      );

    const className = this.props.className ? this.props.className : "";
    const styles = {

    };

    if (this.state.paymentClicked) {
      return (
        <div className={className}>
          <Order {...this.props} />
        </div>
      )
    } else {
      return (
        <div className={className}>
          <UpperBar backgroundColor="#F4F4F4" textColor="black" text="묶음 배송 가이드" />
          <PaymentBar
            backgroundColor="#A3A3A3"
            {...this.props}
            {...this.state}
            onClickMon={this.onClickMon.bind(this)}
            onClickTue={this.onClickTue.bind(this)}
            onClickWed={this.onClickWed.bind(this)}
            onClickThur={this.onClickThur.bind(this)}
            onClickFri={this.onClickFri.bind(this)}
            onClickPaymentButton={this.onClickPaymentButton.bind(this)}
          />
          <div style={{textAlign: "center"}} >
            <img src="https://i.imgur.com/x80XR2r.png" alt="" />
          </div>
        </div>
      )
    }


  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product.product
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getProduct,
    getProductCheck
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);

