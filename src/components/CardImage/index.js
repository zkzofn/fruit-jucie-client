import React, { Component } from 'react';
import BackgroundImage from '../BackgroundImage';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
/**
 * @props
 *    className
 *    url
 *    height
 *    title
 *    subtitle
 *    productId
 */
export default class CardImage extends Component {
  constructor(props) {
    super(props)

  }

  onClickItem() {
    this.props.history.push(`/shop/${this.props.productId}`);
  }

  render() {
    console.log(this.props);

    const className = this.props.className ? this.props.className : "";
    const url = this.props.url ? this.props.url : "https://i.imgur.com/tG6Sw83.jpg";
    const height = this.props.height ? this.props.height : 500;
    const title = this.props.title ? this.props.title : "Overlay title";
    const subtitle = this.props.subtitle ? this.props.subtitle : "Overlay subtitle";



    return (
      <div className={className} onClick={this.onClickItem.bind(this)}>
        <Card>
          <CardMedia
            overlay={<CardTitle title={title} subtitle={subtitle} />}
          >
            <BackgroundImage url={url} height={height} />
          </CardMedia>
        </Card>
      </div>
    )
  }
}