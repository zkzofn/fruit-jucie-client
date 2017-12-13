import React, { Component } from 'react';

/**
 * @props
 *    url
 *    height
 */
export default class BackgroundImage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const styles = {
      picture: {
        background: `url(${this.props.url ? this.props.url : "/assets/img/main_coming.jpg"}) center center`,
        backgroundSize: "cover",
        height: this.props.height ? this.props.height : 500
      }
    };

    return (
      <div style={styles.picture}></div>
    );
  }
}