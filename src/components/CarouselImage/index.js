import React, { Component } from 'react';
import BackgroundImage from '../BackgroundImage';
import Carousel from 'react-slick';

/**
 * @props
 *    height
 */
export default class CarouselImage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
    };

    const height = this.props.height ? this.props.height : 700;

    return (
      <Carousel {...settings} >
        <div>
          <BackgroundImage url="https://i.imgur.com/NCPWR7o.jpg" height={height} />
        </div>
        <div>
          <BackgroundImage url="https://i.imgur.com/hzkCoZl.jpg" height={height}/>
        </div>
        <div>
          <BackgroundImage url="https://i.imgur.com/tG6Sw83.jpg" height={height}/>
        </div>
      </Carousel>
    )
  }
}