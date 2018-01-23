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

  }

  render() {
    const className = this.props.className ? this.props.className : "";

    const style = {
      margin: "auto",
      padding: 80,
      textAlign: "center",
      fontWeight: "bold",
      backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : "#3B574F",
      color: this.props.textColor ? this.props.textColor : "white"
    };

    const text = this.props.text ? this.props.text : "test text"

    return (
      <div className={className}>
        <div style={style}>
          <div style={{maxWidth: 560}}>
            <SelectDay />
            <PaymentButton className="inlineBlock col-6" />
            <AddCartButton className="inlineBlock col-6" />
          </div>
        </div>
      </div>
    )
  }
}