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

    this.state = {
      mon: false,
      tue: false,
      wed: false,
      thur: false,
      fri: false
    }
  }

  onClickMon(mon) {
    this.setState({mon});
  }

  onClickTue(tue) {
    this.setState({tue})
  }

  onClickWed(wed) {
    this.setState({wed})
  }

  onClickThur(thur) {
    this.setState({thur})
  }

  onClickFri(fri) {
    this.setState({fri})
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

    return (
      <div className={className}>
        <div style={style}>
          <div>
            <SelectDay
              onClickMon={this.onClickMon.bind(this)}
              onClickTue={this.onClickTue.bind(this)}
              onClickWed={this.onClickWed.bind(this)}
              onClickThur={this.onClickThur.bind(this)}
              onClickFri={this.onClickFri.bind(this)}
            />
            <PaymentButton className="inlineBlock" />
            <AddCartButton className="inlineBlock" />
          </div>
        </div>
      </div>
    )
  }
}