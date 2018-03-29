import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UpperBar from '../UpperBar';
import SelectDay from '../Buttons/SelectDay';
import PaymentBar from '../PaymentBar';
import Order from '../Order';

import { getProduct } from '../../actions/RequestManager';

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
      fri: false
    };

    // 이건 나중에 API 불러서 목록 가져오는걸로 바꿀거야
    this.itemInfo = {
      days: null
    }
  }

  componentWillMount() {
    // 여기서 item 정보 불러와
    // 여기서 days --> this.itemInfo.days = days 꼭 설정해줘
    //    DB 상에서 days 는 null 허용
    // 이건 item의 정보에 따라서
    console.log(this.props);

    const params = {
      productId: this.props.match.params.productId
    };

    this.props.getProductCheck(params).then(res => {
      const { productCheck } = res.payload.data;

      if (productCheck) {
        this.props.getProduct(params).then(res => {
          const { product } = res.payload.data;
          product.count = 1;
          this.setState({product})
        });
      } else {
        // 여기서 product 결과 없을때 alert
      }
    });



    this.itemInfo.days = 3;
  }

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
            {...this.itemInfo}
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
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getProduct
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);

