import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

export default class Item2 extends Component {
  constructor(props) {
    super(props);
    this.state = { opacity: 1 }
  };

  onMouseOver () {
    this.setState({ opacity: 0.4 })
  }

  onMouseOut () {
    this.setState({ opacity: 1 });
  }

  render() {
    const styles = {
      imgStyle: {
        opacity: this.state.opacity,
      }
    };

    return (
      <div
        className={`my-2 ${this.props.className}`}
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseOut={this.onMouseOut.bind(this)}
        style={styles.imgStyle}
      >
        <CardMedia>
          <img src="http://res.heraldm.com/content/orga/2017/01/19/20170119165813_orgafd_image1_211_54_35_200_7435.jpg" alt="" />
        </CardMedia>
        <CardTitle style={{textAlign: 'center'}} title="쫀득한 군고구마" subtitle="14,800원" />
      </div>
    )
  }
}

