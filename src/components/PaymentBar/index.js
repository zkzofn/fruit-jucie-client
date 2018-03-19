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
      count: 0,
      mon: false,
      tue: false,
      wed: false,
      thur: false,
      fri: false
    }
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
      if (this.props.days)
        return (
          <SelectDay
            days={this.props.days}
            onClickMon={this.onClickMon.bind(this)}
            onClickTue={this.onClickTue.bind(this)}
            onClickWed={this.onClickWed.bind(this)}
            onClickThur={this.onClickThur.bind(this)}
            onClickFri={this.onClickFri.bind(this)}
          />
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
              count={this.state.count}
              mon={this.state.mon}
              tue={this.state.tue}
              wed={this.state.wed}
              thur={this.state.thur}
              fri={this.state.fri}
            />
            <AddCartButton
              {...this.props}
              className="inlineBlock"
              count={this.state.count}
              mon={this.state.mon}
              tue={this.state.tue}
              wed={this.state.wed}
              thur={this.state.thur}
              fri={this.state.fri}
            />
          </div>
        </div>
      </div>
    )
  }
}