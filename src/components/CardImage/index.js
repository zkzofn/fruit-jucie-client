import React, { Component } from 'react';
import BackgroundImage from '../BackgroundImage';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

/**
 * @props
 *    height
 *    width
 *    imgUrl
 */
export default class CardImage extends Component {
  constructor(props) {
    super(props)

    this.imgUrl = props.imgUrl ? props.imgUrl : "https://i.imgur.com/tG6Sw83.jpg";
  }

  render() {
    const styles = {
      card: {
        height: this.props.height ? this.props.height : 200,
        width: this.props.width ? this.props.width: 200
      }
    };



    return (
      <Card style={styles.card}>
        <CardMedia
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
          <img src={this.imgUrl} alt="" />
        </CardMedia>
      </Card>
    )
  }
}