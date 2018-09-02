import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SelectDay from '../Buttons/SelectDay';
import PaymentButton from '../Buttons/PaymentButton';
import AddCartButton from '../Buttons/AddCartButton';
import CountButton from '../Buttons/CountButton';

/**
 * @props
 *    className
 *    backgroundColor
 *    textColor
 *    text
 */
class PaymentBar extends Component {
  constructor(props) {
    super(props);
  }

  onClickPaymentButton(paymentButtonClicked) {
    this.props.onClickPaymentButton(paymentButtonClicked);
  }

  onClickAddCartButton(addCartButtonClicked) {
    this.props.onClickAddCartButton(addCartButtonClicked)
  }

  render() {
    console.log(this.props);

    const className = this.props.className ? this.props.className : "";

    const style = {
      margin: "auto",
      // padding: 80,
      textAlign: "center",
      fontWeight: "bold",
      backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : "#3B574F",
      color: this.props.textColor ? this.props.textColor : "white"
    };

    const renderSelectDays = () => {
      if (this.props.product.days)
        return (
          <SelectDay {...this.props} />
        )
    };

    return (
      <div className={className}>
        <div style={style}>
          <div>
            {renderSelectDays()}
            <CountButton
              {...this.props}
            />
            <PaymentButton
              {...this.props}
              className="inlineBlock"
            />
            <AddCartButton
              {...this.props}
              className="inlineBlock"
            />
            <div style={{fontSize: 18, paddingBottom: 10}}>
              {(this.props.product.price_sale * this.props.productCount).toLocaleString()} 원
            </div>
          </div>
        </div>
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
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentBar);
