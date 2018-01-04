import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * @props
 *    className
 *    days (주 몇 회인지 선택 / default: 3)
 */
export default class SelectDay extends Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 0
    }
  }

  componentWillMount() {

  }

  //
  render() {
    const className = this.props.className ? this.props.className : "";
    const days = this.props.days ? this.props.days : 3;

    const styles = {
      button: {
        margin: 12,
      }
    };


    return (
      <div className={className}>
        <RaisedButton label="Mon" style={styles.button} />
        <RaisedButton label="Tue" style={styles.button} />
        <RaisedButton label="Wed" style={styles.button} />
        <RaisedButton label="Thur" style={styles.button} />
        <RaisedButton label="Fri" style={styles.button} />
      </div>
    )
  }
}