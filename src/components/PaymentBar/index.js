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
    super(props)


    this.onClickPaymentButton = this.onClickPaymentButton.bind(this);
    this.onClickAddCartButton = this.onClickAddCartButton.bind(this);
  }

  onClickPaymentButton() {
    console.log("clicked payment button");
  };

  onClickAddCartButton() {
    console.log("clicked add cart button");
  };

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

    const text = this.props.text ? this.props.text : "test text"

    return (
      <div className={className}>
        <div style={style}>
          <div>
            <SelectDay />
            <PaymentButton className="inlineBlock" onClick={this.onClickPaymentButton} />
            <AddCartButton className="inlineBlock" onClick={this.onClickAddCartButton} />
          </div>
        </div>
      </div>
    )
  }
}