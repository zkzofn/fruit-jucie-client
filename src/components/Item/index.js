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
      alertServerErrorOpen: false,
      dayCount: 0,
      mon: false,
      tue: false,
      wed: false,
      thur: false,
      fri: false,
      alertOpen: false,
      options: [],
      productCount: 1,
      selectedOptions: []
    };

    this.alertServerErrorMessage = "카트에 담는 중 에러가 발생했습니다. 관리자에게 문의해주세요.";
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

  onClickAddButton() {
    this.setState(prevState => {
      return {
        productCount: prevState.productCount + 1
      }
    })
  }

  onClickRemoveButton() {
    this.setState(prevState => {
      return {
        productCount: prevState.productCount - 1
      }
    })
  }

  onClickPaymentButton(paymentButtonClicked) {
    this.props.product.count = this.state.productCount;
    this.setState({paymentButtonClicked});

    // <Order /> 내에서
    // 요일 데이터 맞춰서 api call 해주는 것도 해야 해
  }

  onClickAddCartButton(addCartButtonClicked) {
    // 우선 카트에 저장하고
    // 여기서 dialog 띄워줘

    const postCartData = {
      product: {
        id: this.props.product.id,  // 여기서 product 는 getProduct 에서 받아온 정보 + product.count = 1;
        count: this.state.productCount,
        daysCondition: {
          mon: this.state.mon,
          tue: this.state.tue,
          wed: this.state.wed,
          thur: this.state.thur,
          fri: this.state.fri
        }
      },
      selectedOptions: this.state.selectedOptions
    };

    this.props.postCart(postCartData).then((results) => {
      if (results.error) {
        // 에러 났을 시,
        // 여기다가 관리자한테 직접 alert 갈수 있는 기능 추가해
        // results 안에 call 정보 다 들어있어.
        // ex) sentry

        this.setState({alertServerErrorOpen: true});
      } else {
        this.setState({addCartButtonClicked});
      }
    })
  }

  handleCartAlertClose = () => {
    this.setState({addCartButtonClicked: false})
  };

  handleAlertServerErrorClose = () => {
    this.setState({alertServerErrorOpen: false})
  };

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

    const alertServerErrorActions = [
      <FlatButton
        label="확인"
        primary={true}
        onClick={this.handleAlertServerErrorClose}
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
          <UpperBar backgroundColor="#F4F4F4" textColor="black" text="여러 세트를 구매하는데 다른 요일로 주문하고 싶으면 전화문의 주세요" />
          <PaymentBar
            backgroundColor="#A3A3A3"
            {...this.props}
            {...this.state}
            onClickMon={this.onClickMon.bind(this)}
            onClickTue={this.onClickTue.bind(this)}
            onClickWed={this.onClickWed.bind(this)}
            onClickThur={this.onClickThur.bind(this)}
            onClickFri={this.onClickFri.bind(this)}
            onClickAddButton={this.onClickAddButton.bind(this)}
            onClickRemoveButton={this.onClickRemoveButton.bind(this)}
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
          <Dialog
            actions={alertServerErrorActions}
            modal={false}
            open={this.state.alertServerErrorOpen}
            onRequestClose={this.handleAlertServerErrorClose}
          >
            {this.alertServerErrorMessage}
          </Dialog>
        </div>
      )
    }


  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product.product,
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

