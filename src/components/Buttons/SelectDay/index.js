import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * @props
 *    className
 *    days (주 몇 회인지 선택)
 */
export default class SelectDay extends Component {
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

  onClickMon() {
    this.setState(prevState => {
      if (!(prevState.mon === false && prevState.count === this.props.product.days)) {
        const mon = !prevState.mon;
        const count = prevState.mon ? prevState.count - 1 : prevState.count + 1;

        this.props.onClickMon(mon, count);

        return { mon, count }
      }
    })
  };

  onClickTue() {
    this.setState(prevState => {
      if (!(prevState.tue === false && prevState.count === this.props.product.days)) {
        const tue = !prevState.tue;
        const count = prevState.tue ? prevState.count - 1 : prevState.count + 1;

        this.props.onClickTue(tue, count);

        return { tue, count }
      }
    })
  }


  onClickWed() {
    this.setState(prevState => {
      if (!(prevState.wed === false && prevState.count === this.props.product.days)) {
        const wed = !prevState.wed;
        const count = prevState.wed ? prevState.count - 1 : prevState.count + 1;

        this.props.onClickWed(wed, count);

        return { wed, count }
      }
    })
  }

  onClickThur() {
    this.setState(prevState => {
      if (!(prevState.thur === false && prevState.count === this.props.product.days)) {
        const thur = !prevState.thur;
        const count = prevState.thur ? prevState.count - 1 : prevState.count + 1;

        this.props.onClickThur(thur, count);

        return { thur, count }
      }
    })
  }

  onClickFri() {
    this.setState(prevState => {
      if (!(prevState.fri === false && prevState.count === this.props.product.days)) {
        const fri = !prevState.fri;
        const count = prevState.fri ? prevState.count - 1 : prevState.count + 1;

        this.props.onClickFri(fri, count);

        return { fri, count }
      }
    })
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
        <RaisedButton label="Mon" style={styles.button} onClick={this.onClickMon.bind(this)} primary={this.state.mon} />
        <RaisedButton label="Tue" style={styles.button} onClick={this.onClickTue.bind(this)} primary={this.state.tue} />
        <RaisedButton label="Wed" style={styles.button} onClick={this.onClickWed.bind(this)} primary={this.state.wed} />
        <RaisedButton label="Thur" style={styles.button} onClick={this.onClickThur.bind(this)} primary={this.state.thur} />
        <RaisedButton label="Fri" style={styles.button} onClick={this.onClickFri.bind(this)} primary={this.state.fri} />
      </div>
    )
  }
}