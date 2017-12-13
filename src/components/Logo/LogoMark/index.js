import React, { Component } from 'react';

/**
 * @props
 *    props
 *    url
 *    width
 */
export default class LogoMark extends Component {
  constructor(props) {
    super(props)
  }

  onTouchLogo = () => {
    this.props.history.push("/");
  };

  render() {

    const styles = {
      div: {
        height: 48
      },
      logo: {
        width: this.props.width ? this.props.width : 80,
        cursor: "pointer",
        marginTop: 3,
        marginLeft: 5
      }
    };

    return (
      <div
        className={this.props.className ? this.props.className : ""}
        style={styles.div}
      >
        <img
          src={this.props.url ? this.props.url : "/assets/img/logo_mark_trans.png"}
          style={styles.logo}
          onClick={this.onTouchLogo}
        />
      </div>
    )
  }
}

