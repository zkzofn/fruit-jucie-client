import React, { Component } from 'react';
/**
 * @props
 *    className
 *    text
 */
export default class UpperBar extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const className = this.props.className ? this.props.className : "";

    const style = {
      margin: "20px auto",
      padding: "80",
      backgroundColor: "#3B574F",
      color: "white"
    };

    const text = this.props.text ? this.props.text : "test text"

    return (
      <div className={className}>
        <div style={style}>
          {text}
        </div>
      </div>
    )
  }
}