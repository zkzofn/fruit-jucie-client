import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dialog, FlatButton } from 'material-ui';
import UpperBar from '../UpperBar';
import SelectDay from '../Buttons/SelectDay';
import PaymentBar from '../PaymentBar';
import Order from '../Order';
import CircularProgress from '../CircularProgress';

import { getProduct, getProductCheck, postCart } from '../../actions/RequestManager';

/**
 * @props
 *    className
 */
class Item extends Component {
  constructor(props) {
    super(props);

    // 개별 제품의 경우
    // productCount 셋팅 해주는 부분 해야해
    this.state = {
      paymentButtonClicked: false,
      addCartButtonClicked: false,
      dayCount: 0,
      mon: false,
      tue: false,
      wed: false,
      thur: false,
      fri: false,
      alertOpen: false,
      options: [],
      productCount: 1
    };

    this.alertMessage = "잘못된 경로로 접속하였습니다.";
    this.addCartAlertMessage = "선택한 제품이 장바구니에 담겼습니다.\n계속 쇼핑하시겠습니까?";
  }

  componentWillMount() {
    const params = {
      productId: this.props.match.params.productId
    };

    this.props.getProductCheck(params).then(res => {
      const { productCheck } = res.payload.data;

      if (productCheck) {
        this.props.getProduct(params)
      } else {
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

  onClickPaymentButton(paymentButtonClicked) {
    this.props.product.count = this.state.productCount;
    this.setState({paymentButtonClicked});
  }

  onClickAddCartButton(addCartButtonClicked) {
    this.props.product.count = this.state.productCount;
    this.setState({addCartButtonClicked});

    // 우선 카트에 저장하고
    // 여기서 dialog 띄워줘

    // 이 postCartData 객체 그대로 사용 못한다. 다시 맞게 수정해
    const postCartData = {
      userId: this.props.currentUser.id,
      product: this.state.product,  // 여기서 product 는 getProduct 에서 받아온 정보 + product.count = 1;
      selectedOptions: this.state.selectedOptions
    };

    this.props.postCart().then(() => {

    })

  }

  handleCartAlertClose() {
    this.setState({addCartButtonClicked: false})
  }

  onClickContinue = () => {
    this.props.history.push("/shop");
  };

  onClickGoToCart = () => {
    this.props.history.push("/cart");
  };

  onClickMon(mon, dayCount) {
    this.setState({mon, dayCount});
  }

  onClickTue(tue, dayCount) {
    this.setState({tue, dayCount})
  }

  onClickWed(wed, dayCount) {
    this.setState({wed, dayCount})
  }

  onClickThur(thur, dayCount) {
    this.setState({thur, dayCount})
  }

  onClickFri(fri, dayCount) {
    this.setState({fri, dayCount})
  }

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


    const cartAlertActions = [
      <FlatButton
        label="계속 쇼핑하기"
        primary={true}
        onClick={this.onClickContinue}
      />,
      <FlatButton
        label="장바구니 가기"
        primary={true}
        onClick={this.onClickGoToCart}
      />
    ];

    if (this.state.paymentButtonClicked) {
      return (
        <div>
          <Order
            {...this.props}
            {...this.state}
          />
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
            onClickAddCartButton={this.onClickAddCartButton.bind(this)}
          />
          <div style={{textAlign: "center"}} >
            <img
              src="https://i.imgur.com/x80XR2r.png"
              alt=""
              style={{width: "100%"}} // 화면 크기에 따라 폭 비율 셋팅해야해
            />
          </div>
          <Dialog
            actions={cartAlertActions}
            modal={false}
            open={this.state.addCartButtonClicked}
            onRequestClose={this.handleCartAlertClose}
          >
            {this.addCartAlertMessage}
          </Dialog>
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
    getProductCheck,
    postCart
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);

