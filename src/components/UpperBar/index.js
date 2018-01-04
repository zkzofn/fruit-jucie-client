import React, { Component } from 'react';
/**
 * @props
 *    className
 *    backgroundColor
 *    textColor
 *    text
 */
export default class UpperBar extends Component {
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
      fontSize: 25,
      backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : "#3B574F",
      color: this.props.textColor ? this.props.textColor : "white"
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