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
      dayCount: 0,
      mon: false,
      tue: false,
      wed: false,
      thur: false,
      fri: false
    }
  }

  onClickMon() {
    this.setState(prevState => {
      if (!(prevState.mon === false && prevState.dayCount === this.props.product.days)) {
        const mon = !prevState.mon;
        const dayCount = prevState.mon ? prevState.dayCount - 1 : prevState.dayCount + 1;

        this.props.onClickMon(mon, dayCount);

        return { mon, dayCount }
      }
    })
  };

  onClickTue() {
    this.setState(prevState => {
      if (!(prevState.tue === false && prevState.dayCount === this.props.product.days)) {
        const tue = !prevState.tue;
        const dayCount = prevState.tue ? prevState.dayCount - 1 : prevState.dayCount + 1;

        this.props.onClickTue(tue, dayCount);

        return { tue, dayCount }
      }
    })
  }


  onClickWed() {
    this.setState(prevState => {
      if (!(prevState.wed === false && prevState.dayCount === this.props.product.days)) {
        const wed = !prevState.wed;
        const dayCount = prevState.wed ? prevState.dayCount - 1 : prevState.dayCount + 1;

        this.props.onClickWed(wed, dayCount);

        return { wed, dayCount }
      }
    })
  }

  onClickThur() {
    this.setState(prevState => {
      if (!(prevState.thur === false && prevState.dayCount === this.props.product.days)) {
        const thur = !prevState.thur;
        const dayCount = prevState.thur ? prevState.dayCount - 1 : prevState.dayCount + 1;

        this.props.onClickThur(thur, dayCount);

        return { thur, dayCount }
      }
    })
  }

  onClickFri() {
    this.setState(prevState => {
      if (!(prevState.fri === false && prevState.dayCount === this.props.product.days)) {
        const fri = !prevState.fri;
        const dayCount = prevState.fri ? prevState.dayCount - 1 : prevState.dayCount + 1;

        this.props.onClickFri(fri, dayCount);

        return { fri, dayCount }
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