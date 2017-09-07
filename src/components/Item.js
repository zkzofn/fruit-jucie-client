import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { Link } from 'react-router-dom';

export default class Item extends Component {
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

    const { product } = this.props;

    return (
      <Link to="/item" >
        <div
          className="my-2 col-md-4 col-sm-6 cursorPointer"
          onMouseOver={this.onMouseOver.bind(this)}
          onMouseOut={this.onMouseOut.bind(this)}
          style={styles.imgStyle}
        >
          <CardMedia>
            <img src={`/assets/img/${product.image_path}`} alt="" />
          </CardMedia>
          <CardTitle style={{textAlign: 'center'}} title={product.name} subtitle={`${product.price_sale}원`} />
        </div>
      </Link>
    )
  }
}

