import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * @props
 *    className
 *    days (주 몇 회인지 선택 / default: 3)
 */
export default class SelectDay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      days: props.days ? props.days : 3,
      mon: false,
      tue: false,
      wed: false,
      thur: false,
      fri: false
    }
  }

  componentWillMount() {

  }

  onClickMon() {
    this.setState(prevState => {
      if (!(prevState.mon === false && prevState.count === this.state.days)) {
        return {
          mon: !prevState.mon,
          count: prevState.mon ? prevState.count - 1 : prevState.count + 1
        }
      }
    })
  };

  onClickTue() {
    this.setState(prevState => {
      if (!(prevState.tue === false && prevState.count === this.state.days)) {
        return {
          tue: !prevState.tue,
          count: prevState.tue ? prevState.count - 1 : prevState.count + 1
        }
      }
    })
  }


  onClickWed() {
    this.setState(prevState => {
      if (!(prevState.wed === false && prevState.count === this.state.days)) {
        return {
          wed: !prevState.wed,
          count: prevState.wed ? prevState.count - 1 : prevState.count + 1
        }
      }
    })
  }

  onClickThur() {
    this.setState(prevState => {
      if (!(prevState.thur === false && prevState.count === this.state.days)) {
        return {
          thur: !prevState.thur,
          count: prevState.thur ? prevState.count - 1 : prevState.count + 1
        }
      }
    })
  }

  onClickFri() {
    this.setState(prevState => {
      if (!(prevState.fri === false && prevState.count === this.state.days)) {
        return {
          fri: !prevState.fri,
          count: prevState.fri ? prevState.count - 1 : prevState.count + 1
        }
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