import React, { Component } from 'react';

/**
 * @props
 *    url
 *    padding
 *    align
 *    width
 */
export default class LogoImage extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    console.log("here");

    const styles = {
      wrapper: {
        padding: this.props.padding ? this.props.padding : 30,
        textAlign: this.props.align ? this.props.align : "center"
      },
      logo: {
        width: this.props.width ? this.props.width : 300
      }
    };

    return (
      <div style={styles.wrapper}>
        <img
          src={this.props.url ? this.props.url : "/assets/img/logo_trans.png"}
          style={styles.logo}
        />
      </div>
    )
  }
}

