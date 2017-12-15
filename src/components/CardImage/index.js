import React, { Component } from 'react';
import BackgroundImage from '../BackgroundImage';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

/**
 * @props
 *    height
 */
export default class CardImage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const styles = {
      card: {
        height: this.props.height ? this.props.height : 200,
      }
    }

    return (
      <Card style={styles.card}>
        <CardMedia
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
          <img src="https://i.imgur.com/tG6Sw83.jpg" alt="" />
        </CardMedia>
      </Card>
    )
  }
}