import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

export default class Item1 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card className={this.props.className}>
        <CardMedia
          overlay={<CardTitle title="쫀득한 군고구마" subtitle="14,800원" />}
          overlayStyle={{textAlign: 'center'}}
        >
          <img src="http://res.heraldm.com/content/orga/2017/01/19/20170119165813_orgafd_image1_211_54_35_200_7435.jpg" alt="" />
        </CardMedia>
      </Card>
    )
  }
}

