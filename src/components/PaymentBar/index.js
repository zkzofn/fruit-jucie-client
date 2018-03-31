import React, { Component } from 'react';
import SelectDay from '../Buttons/SelectDay';
import PaymentButton from '../Buttons/PaymentButton';
import AddCartButton from '../Buttons/AddCartButton';

/**
 * @props
 *    className
 *    backgroundColor
 *    textColor
 *    text
 */
export default class PaymentBar extends Component {
  constructor(props) {
    super(props);
  }

  onClickPaymentButton(paymentClicked) {
    this.props.onClickPaymentButton(paymentClicked);
  }

  render() {
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
            <PaymentButton
              {...this.props}
              className="inlineBlock"
              onClickPaymentButton={this.onClickPaymentButton.bind(this)}
            />
            <AddCartButton
              {...this.props}
              className="inlineBlock"
            />
          </div>
        </div>
      </div>
    )
  }
}