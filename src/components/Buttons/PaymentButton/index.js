import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Payment from 'material-ui/svg-icons/action/payment';

/**
 * @props
 *    className
 *    days (주 몇 회인지 선택 / default: 3)
 */
export default class PaymentButton extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const className = this.props.className ? this.props.className : "";

    const styles = {
      button: {
        margin: 12,
      }
    };



    return (
      <div className={className}>
        <RaisedButton
          icon={<Payment />}
          style={styles.button}
        />
      </div>
    )
  }
}